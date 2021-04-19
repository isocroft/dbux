import path from 'path';
// import glob from 'glob';
import { filesToEntry, getWebpackJs, getWebpackDevServerJs, serializeEnv } from '@dbux/common-node/src/util/webpackUtil';
import { globRelative } from '@dbux/common-node/src/util/fileUtil';

export default class WebpackBuilder {
  constructor(cfg) {
    this.cfg = cfg;
  }

  initProject(project) {
    this.project = project;
  }

  getJsRoot() {
    const { project, cfg } = this;
    return path.join(project.projectPath, cfg.rootPath || '');
  }

  getInputFiles() {
    // return getAllFilesInFolders(path.join(this.projectPath, folder));
    // return globToEntry(this.projectPath, 'js/*');
    const { cfg } = this;
    const root = this.getJsRoot();
    let inputFiles;
    if (cfg.inputPattern) {
      inputFiles = globRelative(root, cfg.inputPattern);
    }
    if (!inputFiles?.length) {
      throw new Error(`inputPattern missing or invalid (no input files found): ${cfg.inputPattern}`);
    }
    return inputFiles;
  }

  /**
   * NOTE: this is separate from `loadBugs` because `loadBugs` might be called before the project has been downloaded.
   * This function however is called after download, so we can make sure that `getInputFiles` actually gets the files.
   */
  decorateBug(bug) {
    if (!this.inputFiles) {
      this.inputFiles = this.getInputFiles();
    }
    const {
      project: { projectPath },
      cfg: { websitePort },
      inputFiles
    } = this;

    // bug.runFilePaths = bug.testFilePaths;
    bug.inputFiles = inputFiles;
    bug.watchFilePaths = inputFiles.map(file => path.resolve(projectPath, 'dist', file));

    if (websitePort) {
      // website settings
      bug.websitePort = websitePort;
      bug.website = `http://localhost:${websitePort}${bug.websitePath || '/'}`;
    }
  }

  async startWatchMode(bug) {
    const { project, cfg } = this;

    // start webpack
    const entry = filesToEntry(bug.inputFiles, cfg.rootPath);
    const env = serializeEnv({
      entry,
      port: bug.websitePort || 0
    });

    const webpackBin = bug.websitePort ? getWebpackDevServerJs() : getWebpackJs();
    let cmd = `node ${webpackBin} --display-error-details --watch --config ./dbux.webpack.config.js ${env}`;
    return project.execBackground(cmd);
  }
}