import { TreeItemCollapsibleState } from 'vscode';
import fs from 'fs';
import allApplications from '@dbux/data/src/applications/allApplications';
import { pathRelative } from '@dbux/common-node/src/util/pathUtil';
import { exportApplicationToFile } from '@dbux/projects/src/dbux-analysis-tools/importExport';
import Process from '@dbux/projects/src/util/Process';
import { runTaskWithProgressBar } from '../codeUtil/runTaskWithProgressBar';
import BaseTreeViewNode from '../codeUtil/treeView/BaseTreeViewNode';
import { confirm, showInformationMessage } from '../codeUtil/codeModals';
import { getCurrentResearch } from '../research/Research';

/** @typedef {import('./chapterListBuilderViewController').default} ChapterListBuilderViewController */
/** @typedef {import('@dbux/projects/src/projectLib/Project').ProjectsManager} ProjectsManager */

const ExportExercises = 4;

class ToolNode extends BaseTreeViewNode {
  /**
   * @type {ChapterListBuilderViewController}
   */
  get controller() {
    return this.treeNodeProvider.controller;
  }

  /**
   * @type {ProjectsManager}
   */
  get manager() {
    return this.controller.manager;
  }
}

class GenerateListNode extends ToolNode {
  static makeLabel() {
    return 'Generate Lists';
  }

  async handleClick() {
    const { project } = this.controller;

    if (this.controller.exerciseList) {
      const result = await confirm(`This will discard all DDG data in 'javascript-algorithms-all.js', do you want to continue?`);
      if (!result) {
        return;
      }
    }

    await runTaskWithProgressBar(async (progress) => {
      if (!project.doesProjectFolderExist()) {
        progress.report({ message: `Installing project "${project.name}"...` });
        await this.manager.runner.installProject(project);
      }

      await this.manager.externals.initRuntimeServer();

      progress.report({ message: 'Parsing tests...' });
      const processOptions = {
        cwd: project.projectPath,
      };
      const testDirectory = 'src/algorithms';
      const testDataRaw = await Process.execCaptureOut(`npx jest --json --verbose ${testDirectory}`, { processOptions });
      const testData = JSON.parse(testDataRaw);

      const exerciseConfigs = [];
      const addedPattern = new Set();

      for (const testResult of testData.testResults) {
        for (const assertionResult of testResult.assertionResults) {
          const { fullName } = assertionResult;
          if (!addedPattern.has(fullName)) {
            addedPattern.add(fullName);
          }
          else {
            continue;
          }
          const chapter = fullName.substring(0, fullName.indexOf(' '));
          const exerciseConfig = {
            name: fullName,
            label: fullName,
            testNamePattern: fullName,
            chapter,
            testFilePaths: [pathRelative(project.projectPath, testResult.name)],
          };
          exerciseConfigs.push(exerciseConfig);
        }
      }
      exerciseConfigs.sort((a, b) => a.name.localeCompare(b.name));

      progress.report({ message: `Generating exercise file...` });
      this.controller.writeExerciseJs(exerciseConfigs);

      progress.report({ message: `Loading exercises...` });
      const exerciseList = this.controller.reloadExerciseList();

      progress.report({ message: `Generating chapter list file...` });
      this.controller.writeChapterListJs(exerciseList);

      progress.report({ message: `Loading chapter list...` });
      const chapters = this.controller.reloadChapterList();

      showInformationMessage(`List generated, found ${exerciseConfigs.length} exercise(s) in ${chapters.length} chapter(s).`);

      this.treeNodeProvider.refresh();
    }, { title: 'Generating Chapter List' });
  }
}

class ExportApplicationsForceNode extends ToolNode {
  static makeLabel() {
    return `Export all exercise applications`;
  }

  async handleClick() {
    const { exerciseList } = this.controller;
    if (!exerciseList) {
      showInformationMessage(`Please generate chapter list before exports`);
      return;
    }

    allApplications.clear();

    await runTaskWithProgressBar(async (progress) => {
      progress.report({ message: `Start exporting exercises...` });
      for (let i = 1; i <= ExportExercises; i++) {
        const exercise = exerciseList.getAt(i);

        if (exercise) {
          await this.manager.switchAndTestBug(exercise);
          const app = allApplications.getById(1);
          exportApplicationToFile(app, getCurrentResearch().getAppZipFilePath(app));
          allApplications.clear();
        }

        progress.report({ message: `(${i}/${ExportExercises}) finished...`, increment: Math.floor(100 / ExportExercises) });
      }
    }, { title: `Export applications` });
  }
}


class DeleteExportedApplicationNode extends ToolNode {
  static makeLabel() {
    return `Delete all exported applications`;
  }

  async handleClick() {
    const { exerciseList } = this.controller;
    if (!exerciseList) {
      showInformationMessage(`Please generate chapter list before delete`);
      return;
    }

    await runTaskWithProgressBar(async (progress) => {
      progress.report({ message: `Listing exported files...` });
      const existingFiles = [];
      for (const exercise of exerciseList.getAll()) {
        const filePath = getCurrentResearch().getAppZipFilePath({ experimentId: exercise.id });
        if (fs.existsSync(filePath)) {
          existingFiles.push(filePath);
        }
      }

      if (existingFiles.length) {
        const result = await confirm(`Do you want to delete ${existingFiles.length} exported application file(s)?`);
        if (result) {
          for (const filePath of existingFiles) {
            fs.rmSync(filePath);
          }
          showInformationMessage(`${existingFiles.length} file(s) deleted successfully.`);
        }
      }
      else {
        showInformationMessage(`No exported file found`);
      }
    }, { title: `Delete exported applications` });
  }
}

export default class ToolRootNode extends BaseTreeViewNode {
  static makeLabel() {
    return 'Tools';
  }

  get defaultCollapsibleState() {
    return TreeItemCollapsibleState.Expanded;
  }

  childClasses = [
    GenerateListNode,
    ExportApplicationsForceNode,
    DeleteExportedApplicationNode,
  ]
}
