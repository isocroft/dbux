import fs from 'fs';
import path from 'path';
import pull from 'lodash/pull';
import defaultsDeep from 'lodash/defaultsDeep';
import sh from 'shelljs';
import { newLogger } from '@dbux/common/src/log/logger';
import EmptyObject from '@dbux/common/src/util/EmptyObject';
import EmptyArray from '@dbux/common/src/util/EmptyArray';
import { getAllFilesInFolders, globRelative } from '@dbux/common-node/src/util/fileUtil';
import isObject from 'lodash/isObject';
import BugList from './BugList';
import Process from '../util/Process';
import { checkSystemWithRequirement } from '../checkSystem';
import { MultipleFileWatcher } from '../util/multipleFileWatcher';
import RunStatus, { isStatusRunningType } from './RunStatus';

const SharedAssetFolder = '_shared_assets_';
const PatchFolderName = '_patches_';

/** @typedef {import('../ProjectsManager').default} ProjectsManager */
/** @typedef {import('./Bug').default} Bug */

/**
 * Project class file.
 * @file
 */

export default class Project {
  /**
   * @type {BugList}
   */
  _bugs;

  /**
   * @type {ProjectsManager}
   */
  manager;

  /**
   * Hold reference to webpack (watch mode), `http-serve` and other long-running background processes.
   */
  backgroundProcesses = [];

  /**
   * Automatically assigned from the project registry.
   */
  folderName;

  builder;

  // ###########################################################################
  // config
  // ###########################################################################

  /**
   * Provided for each individual project.
   */
  gitRemote;

  /**
   * A specific commit hash or tag name to refer to (if wanted)
   */
  gitCommit;

  /**
   * Use github by default.
   */
  get gitUrl() {
    return 'https://github.com/' + this.gitRemote;
  }

  nodeVersion;

  get systemRequirements() {
    if (this.nodeVersion) {
      return {
        node: { version: this.nodeVersion }
      };
    }
    return null;
  }

  /**
   * Whether @dbux/cli is needed to instrument and inject @dbux/runtime.
   * Returns false, if build tool already took care of it.
   */
  get needsDbuxCli() {
    return !this.builder || this.builder.needsDbuxCli;
  }


  // ###########################################################################
  // constructor + init
  // ###########################################################################

  constructor(manager) {
    this.manager = manager;

    // NOTE: we get `constructorName` from the registry
    this.name = this.folderName = this.constructor.constructorName;

    this.logger = newLogger(this.debugTag);
  }

  initProject() {
    if (this._initialized) {
      return;
    }
    this._initialized = true;

    // initialize builder
    if (this.makeBuilder) {
      this.builder = this.makeBuilder();
      this.builder.initProject(this);

      if (this.builder.startWatchMode) {
        this.startWatchMode = this.builder.startWatchMode.bind(this.builder);
      }
    }
  }

  async initBug(bug) {
    await this.decorateBug?.(bug);
    await this.builder?.decorateBug(bug);
  }

  // ###########################################################################
  // getters
  // ###########################################################################

  get runner() {
    return this.manager.runner;
  }

  get projectsRoot() {
    return this.manager.config.projectsRoot;
  }

  get dependencyRoot() {
    return this.manager.config.dependencyRoot;
  }

  get projectPath() {
    return path.join(this.projectsRoot, this.folderName);
  }

  get runStatus() {
    if (this.runner.isProjectActive(this)) {
      return this.runner.status;
    }
    else {
      return RunStatus.None;
    }
  }

  getDependencyPath(relativePath) {
    return path.resolve(this.dependencyRoot, 'node_modules', relativePath);
  }

  getNodeVersion(bug) {
    return bug.nodeVersion || this.nodeVersion || '14';
  }

  // ###########################################################################
  // git stuff
  // ###########################################################################

  async isCorrectGitRepository() {
    if (!this.gitRemote) {
      return false;
    }

    const remote = await this.execCaptureOut(`git remote -v`);
    return remote?.includes(this.gitRemote);
  }

  async checkCorrectGitRepository() {
    if (!await this.isCorrectGitRepository()) {
      throw new Error(`Trying to execute command in wrong git repository:\n${await this.execCaptureOut(`git remote -v`)}
This may be solved by using \`Delete project folder\` button.`);
    }
  }

  async gitCheckoutCommit(args) {
    await this.checkCorrectGitRepository();

    await this.exec('git reset --hard ' + (args || ''));
  }

  async gitResetHardForBug(bug) {
    // TODO: make sure, user gets to save own changes first
    sh.cd(this.projectPath);
    if (bug.patch) {
      await this.gitResetHard();
    }
  }

  async gitResetHard() {
    await this.checkCorrectGitRepository();

    if (await this.checkFilesChanged()) {
      await this.exec('git reset --hard');
    }
  }

  // ###########################################################################
  // project methods
  // ###########################################################################

  /**
   * @virtual
   */
  async installProject() {
    await checkSystemWithRequirement(this.manager, this.systemRequirements);

    // git clone
    await this.gitClone();
  }

  /**
   * @abstract
   */
  loadBugs() {
    throw new Error(this + ' abstract method not implemented');
  }

  /**
   * NOTE: A bug should either have a patch or overwrite the project.selectBug method
   * @param {Bug} bug 
   */
  async selectBug(bug) {
    if (bug.patch) {
      return await this.switchToBugPatchTag(bug);
    }
    else {
      throw new Error(this + ' abstract method not implemented');
    }
  }

  async openInEditor() {
    await this.manager.externals.editor.openFolder(this.project.projectPath);
  }

  // ###########################################################################
  // build tools + watch mode
  // ###########################################################################

  /**
   * @param {Bug} bug 
   */
  async startWatchModeIfNotRunning(bug) {
    if (!this.backgroundProcesses?.length && this.startWatchMode) {
      const outputFileString = bug.watchFilePaths
        .map(f => `"${f}"`)
        .join(', ');
      let _firstOutputPromise = new Promise((resolve, reject) => {
        // watch out for entry (output) files to be created
        const watchFiles = bug.watchFilePaths.map(f => path.resolve(this.projectPath, f));
        const watcher = new MultipleFileWatcher(watchFiles);
        watcher.on('change', (filename, curStat, prevStat) => {
          try {
            if (curStat.birthtime.valueOf() === 0) {
              return;
            }
            watcher.close();
            resolve();
          }
          catch (err) {
            this.logger.warn(`file watcher failed while waiting for "${outputFileString}" - ${err?.stack || err}`);
          }
        });
      });

      // start
      const backgroundProcess = await this.startWatchMode(bug).catch(err => {
        // this.logger.error('startWatchMode failed -', err?.stack || err);
        throw new Error(`startWatchMode failed while waiting for "${outputFileString}" - ${err?.stack || err}`);
      });

      // if (!this.backgroundProcesses?.length) {
      //   this.logger.error('startWatchMode did not result in any new background processes');
      // }

      // wait for output files, before moving on
      this.logger.debug(`startWatchMode waiting for output files: ${outputFileString} ...`);
      await Promise.race([
        // wait for files to be ready, or...
        _firstOutputPromise,

        // ... watch process to exit prematurely
        backgroundProcess.waitToEnd().then(() => {
          if (_firstOutputPromise) {
            // BackgroundProcess ended prematurely
            throw new Error('watch mode BackgroundProcess exited before files were generated');
          }
        })
      ]);
      _firstOutputPromise = null;
      this.logger.debug(`startWatchMode finished.`);
    }
  }

  getWebpackJs() {
    return this.manager.getDbuxPath('webpack/bin/webpack.js');
  }

  // ###########################################################################
  // utilities
  // ###########################################################################

  execInTerminal = async (command, options) => {
    let cwd = options?.cwd || this.projectPath;

    const result = await this.manager.externals.TerminalWrapper.execInTerminal(cwd, command, {}).
      waitForResult();

    let code;
    if (Array.isArray(result)) {
      code = result[result.length - 1].code;
    }
    else {
      code = result?.code;
    }

    if (options?.failOnStatusCode === false) {
      return code;
    }
    if (code) {
      const processExecMsg = `${cwd}$ ${command}`;
      throw new Error(`Process failed with exit code ${code} (${processExecMsg})`);
    }
    return 0;
  }

  async installPackages(s, force = true) {
    // TODO: yarn workspaces causes trouble for `yarn add`.
    //        Might need to use a hack, where we manually insert it into `package.json` and then run yarn install.
    // TODO: let user choose, or just prefer yarn by default?

    if (isObject(s)) {
      s = Object.entries(s).map(([name, version]) => `${name}@${version}`).join(' ');
    }

    const cmd = this.preferredPackageManager === 'yarn' ?
      'yarn add --dev' :
      `npm install -D ${force && '--force'}`;
    return this.execInTerminal(`${cmd} ${s}`);
  }

  exec = async (command, options, input) => {
    const cwd = options?.cwd || this.projectPath;
    options = defaultsDeep(options, {
      ...(options || EmptyObject),
      processOptions: {
        cwd
      }
    });
    return this.runner._exec(command, this.logger, options, input);
  }

  execCaptureOut = async (command, processOptions) => {
    processOptions = {
      cwd: this.projectPath,
      ...(processOptions || EmptyObject)
    };
    return Process.execCaptureOut(command, { processOptions });
  }

  execBackground(cmd, options) {
    const {
      projectPath
    } = this;

    // set cwd
    let cwd = options?.cwd || projectPath;
    const env = {
      NODE_SKIP_PLATFORM_CHECK: 1,
      ...options?.env
    };

    // set cwd option
    options = defaultsDeep(options, {
      processOptions: {
        cwd,
        env
      }
    });

    // cd into it
    sh.cd(cwd);

    // // wait until current process finshed it's workload
    // this._process?.waitToEnd();

    const process = new Process();
    this.backgroundProcesses.push(process);
    process.
      start(cmd, this.logger, options).
      catch(err => this.logger.error(err)).
      finally(() => {
        pull(this.backgroundProcesses, process);
        if (!this.backgroundProcesses.length) {
          this.runner.maybeSetStatusNone(this);
        }
      });
    return process;
  }

  /**
   * NOTE: does not include new files. For that, consider `hasAnyChangedFiles()` below.
   * @return {bool} Whether any files in this project have changed.
   * @see https://stackoverflow.com/questions/3878624/how-do-i-programmatically-determine-if-there-are-uncommitted-changes
   */
  async checkFilesChanged() {
    await this.checkCorrectGitRepository();

    // Not sure what this line does, but seems not really useful here, since these two line does the same thing.
    // await this.exec('git update-index --refresh');

    // NOTE: returns status code 1, if there are any changes, IFF --exit-code or --quiet is provided
    // see: https://stackoverflow.com/questions/28296130/what-does-this-git-diff-index-quiet-head-mean
    const code = await this.exec('git diff-index --exit-code HEAD --', { failOnStatusCode: false });

    return !!code;  // code !== 0 means that there are pending changes
  }

  // async hasAnyChangedFiles() {
  //   const changes = await this.execCaptureOut(`git status -s`);
  //   return !!changes;
  // }

  // ###########################################################################
  // install helpers
  // ###########################################################################

  /**
   * NOTE: This method is called by `gitClone`, only after a new clone has succeeded.
   */
  async install() {
    // remove and copy assets
    await this.installAssets();
    await this.autoCommit();  // auto-commit -> to be on the safe side

    await this.applyBugPatchToTags();

    // install dbux dependencies
    await this.manager.installDependencies();

    // NOTE: disable yarn support for now
    // if (this.packageManager === 'yarn') {
    //   await this.yarnInstall();
    // }
    // else {
    await this.npmInstall();
    // }

    // custom dependencies
    await this.installDependencies();

    // custom `afterInstall` hook
    await this.afterInstall();
    await this.builder?.afterInstall?.();

    // after install completed: commit modifications, so we can easily apply patches etc (if necessary)
    await this.autoCommit();
  }

  /**
   * NOTE: this method is called by `install` by default.
   * If already cloned, this will do nothing.
   * @virtual
   */
  async installDependencies() {
  }

  async afterInstall() { }

  async autoCommit(bug) {
    await this.checkCorrectGitRepository();

    if (await this.checkFilesChanged()) {
      // only auto commit if files changed
      const files = this.getAllAssetFiles();
      // this.logger.log(`[auto commit] ${files.join(', ')}`);

      // await this.exec(`git add ${files.map(name => `"${name}"`).join(' ')} && git commit -am '"[dbux auto commit]"' --allow-empty`);

      // NOTE: && is not supported in all shells (e.g. Powershell)
      await this.exec(`git add ${files.map(name => `"${name}"`).join(' ')}`);

      // TODO: should not need '--allow-empty', if `checkFilesChanged` is correct (but somehow still bugs out)
      await this.exec(`git commit -am '"[dbux auto commit]"' --allow-empty`);

      await this.gitAddOrUpdateTag(bug);
    }
  }

  async tryDeactivate() {
    // ensure project is not running
    if (isStatusRunningType(this.runStatus)) {
      const confirmMessage = `Project ${this.name} is currently running, do you want to stop it?`;
      if (await this.manager.externals.confirm(confirmMessage)) {
        await this.runner.cancel();
      }
      else {
        return false;
      }
    }

    // ensure project is not active
    if (this.runner.isProjectActive(this)) {
      await this.runner.deactivateBug();
    }

    return true;
  }

  async deleteProjectFolder() {
    if (!await this.tryDeactivate()) {
      return false;
    }

    sh.rm('-rf', this.projectPath);
    this._installed = false;
    return true;
  }

  doesProjectFolderExist() {
    return sh.test('-d', path.join(this.projectPath, '.git'));
  }


  async gitClone() {
    const {
      projectsRoot,
      projectPath,
      gitUrl: githubUrl
    } = this;

    // TODO: read git + editor commands from config

    // clone (will do nothing if already cloned)
    if (!this.doesProjectFolderExist()) {
      // const curDir = sh.pwd().toString();
      // this.log(`Cloning from "${githubUrl}"\n  in "${curDir}"...`);
      // project does not exist yet
      try {
        this.runner.createMainFolder();
        await this.execInTerminal(`git clone "${githubUrl}" "${projectPath}"`, {
          cwd: projectsRoot
        });
      }
      catch (err) {
        const errMsg = `Failed to clone git repository. This may be solved by using \`Delete project folder\` button. ${err.stack}`;
        throw new Error(errMsg);
      }

      sh.cd(projectPath);

      // if given, switch to specific commit hash, branch or tag name
      // see: https://stackoverflow.com/questions/3489173/how-to-clone-git-repository-with-specific-revision-changeset
      if (this.gitCommit) {
        await this.gitCheckoutCommit(this.gitCommit);
      }

      this.log(`Cloned. Installing...`);

      // run hook
      await this.install();

      // log('  ->', result.err || result.out);
      // (result.err && warn || log)('  ->', result.err || result.out);
      this.log(`Install finished.`);
    }
    else {
      sh.cd(projectPath);
      this.log('(skipped cloning)');
    }
  }

  async applyBugPatchToTags() {
    await this.gitAddOrUpdateTag(null);
    let bugs = this.getOrLoadBugs();
    for (let bug of bugs) {
      if (bug.patch) {
        await this.applyPatch(bug.patch);
        await this.exec(`git commit -am '"[dbux auto commit] Patch ${bug.patch}"' --allow-empty`);
        await this.gitAddOrUpdateTag(bug);
        await this.revertPatch(bug.patch);
      }
    }
  }

  async switchToBugPatchTag(bug) {
    const tagName = this.getBugTagName(bug);
    return this.gitCheckout(tagName);
  }

  get preferredPackageManager() {
    if (this.packageManager) {
      return this.packageManager;
    }

    // TODO: prefer yarn if yarn is installed
    if (process.env.NODE_ENV === 'development') {
      // yarn is just faster (as of April/2021)
      return 'yarn';
    }
    return 'npm';
  }

  async npmInstall() {
    if (this.preferredPackageManager === 'yarn') {
      await this.execInTerminal('yarn install');
    }
    else {
      // await this.exec('npm cache verify');
      // hackfix: npm installs are broken somehow.
      //      see: https://npm.community/t/need-to-run-npm-install-twice/3920
      //      Sometimes running it a second time after checking out a different branch 
      //      deletes all node_modules. The second run brings everything back correctly (for now).
      await this.execInTerminal(`npm install && npm install`);
    }
  }

  // async yarnInstall() {
  //   await this.exec(`yarn install`);
  // }

  // ###########################################################################
  // assets
  // ###########################################################################

  /**
   * Copy all assets into project folder.
   */
  async installAssets() {
    // remove unwanted files
    let { projectPath, rmFiles } = this;
    if (rmFiles?.length) {
      const absRmFiles = rmFiles.map(fName => path.resolve(projectPath, fName));
      const iErr = absRmFiles.findIndex(f => !f.startsWith(projectPath));
      if (iErr >= 0) {
        throw new Error('invalid entry in `rmFiles` is not in `projectPath`: ' + rmFiles[iErr]);
      }
      this.logger.warn('Removing files:', absRmFiles.join(','));
      sh.rm('-rf', absRmFiles);
    }

    // copy assets
    const folders = this.getAllAssetFolderNames();
    folders.forEach(folderName => {
      this.copyAssetFolder(folderName);
    });

    // make sure, we have node at given version and node@lts
    if (this.nodeVersion) {
      await this.exec(`volta fetch node@${this.nodeVersion} node@lts npm@lts`);
      await this.exec(`volta pin node@${this.nodeVersion}`);
    }
  }

  getAssetDir(assetPath) {
    if (path.isAbsolute(assetPath)) {
      // absolute path
      return fs.realpathSync(assetPath);
    }
    else {
      // relative to dbux-internal asset path
      return this.manager.externals.resources.getResourcePath('dist', 'projects', assetPath);
    }
  }

  getAllAssetFolderNames() {
    const individualAssetDir = this.getAssetDir(this.folderName);
    if (sh.test('-d', individualAssetDir)) {
      return [SharedAssetFolder, this.folderName];
    }
    else {
      return [SharedAssetFolder];
    }
  }

  getAllAssetFiles() {
    return this
      .getAllAssetFolderNames()
      .map(folderName => this.getAssetDir(folderName))
      .flatMap(f => globRelative(f, '**/*'));
  }

  copyAssetFolder(assetFolderName) {
    // const assetDir = path.resolve(path.join(__dirname, `../../dbux-projects/assets/${assetFolderName}`));
    const assetDir = this.getAssetDir(assetFolderName);
    // copy assets, if this project has any
    this.logger.log(`Copying assets from ${assetDir} to ${this.projectPath}`);

    // Globs are tricky. See: https://stackoverflow.com/a/31438355/2228771
    const copyRes = sh.cp('-rf', `${assetDir}/{.[!.],..?,}*`, this.projectPath);

    const assetFiles = getAllFilesInFolders(assetDir).join(',');
    // this.log(`Copied assets. All root files: ${await getAllFilesInFolders(this.projectPath, false).join(', ')}`);
    this.log(`Copied assets (${assetDir}): result=${copyRes.toString()}, files=${assetFiles}`,
      // this.execCaptureOut(`cat ${this.projectPath}/.babelrc.js`)
    );
  }

  // ###########################################################################
  // patches
  // ###########################################################################

  getPatchFolder() {
    return path.join(this.getAssetDir(PatchFolderName), this.folderName);
  }

  getPatchFile(patchFName) {
    if (!patchFName.endsWith('.patch')) {
      patchFName += '.patch';
    }
    return path.join(this.getPatchFolder(), patchFName);
  }

  // ###########################################################################
  // git commands
  // ###########################################################################

  /**
   * Apply (or revert) a patch file
   * @param {String} patchFName 
   * @param {Boolean} revert 
   */
  async applyPatch(patchFName, revert = false) {
    await this.checkCorrectGitRepository();

    const patchPath = this.getPatchFile(patchFName);
    return this.exec(`git apply ${revert ? '-R' : ''} --ignore-space-change --ignore-whitespace "${patchPath}"`);
  }

  async revertPatch(patchFName) {
    return this.applyPatch(patchFName, true);
  }

  /**
   * Pipe patch content string to `git apply` via stdin.
   * 
   * @see https://git-scm.com/docs/git-apply#Documentation/git-apply.txt-ltpatchgt82308203
   */
  async applyPatchString(patchString) {
    await this.checkCorrectGitRepository();

    return this.exec(`git apply --ignore-space-change --ignore-whitespace`, null, patchString);
  }

  async getPatchString() {
    await this.checkCorrectGitRepository();

    return this.execCaptureOut(`git diff --color=never`);
  }

  async getTagName() {
    await this.checkCorrectGitRepository();

    return (await this.execCaptureOut(`git describe --tags`)).trim();
  }

  /**
   * Checkout to some distination
   * @param {String} checkoutTo 
   */
  async gitCheckout(checkoutTo) {
    return this.exec(`git checkout "${checkoutTo}"`);
  }

  getBugTagName(bug) {
    if (bug?.patch) {
      return `__dbux_bug_${bug.patch}`;
    }
    return '__dbux_bug_nopatch';
  }

  /**
   * @param {Bug} bug
   */
  async gitAddOrUpdateTag(bug) {
    const tagName = this.getBugTagName(bug);
    return this.gitSetTag(tagName);
  }
  
  /**
   * Tag current commit
   * @param {String} tagName 
   */
  async gitSetTag(tagName) {
    await this.checkCorrectGitRepository();
    return this.exec(`git tag -f "${tagName}"`);
  }


  // ###########################################################################
  // bugs
  // ###########################################################################

  /**
   * Get all bugs for this project
   * @return {BugList}
   */
  getOrLoadBugs() {
    if (!this._bugs) {
      let arr = this.loadBugs();
      if (process.env.NODE_ENV === 'production') {
        // NOTE: this is an immature feature
        //      for now, only provide one bug for demonstration purposes and to allow us gather feedback
        arr = arr.filter(bug => bug.label && bug.bugLocations?.length);
      }

      this._bugs = new BugList(this, arr);
    }
    return this._bugs;
  }

  getMochaCfg(bug, moreMochaArgs) {
    return {
      require: bug.require,
      keepAlive: bug.keepAlive,
      testArgs: this.getMochaRunArgs(bug, moreMochaArgs)
    };
  }

  getJestCfg(bug, moreJestArgs) {
    return {
      require: bug.require,
      // keepAlive: bug.keepAlive,
      testArgs: this.getJestRunArgs(bug, moreJestArgs)
    };
  }

  /**
   * @see https://mochajs.org/#command-line-usage
   */
  getMochaRunArgs(bug, moreArgs = EmptyArray) {
    // bugArgs
    const argArray = [
      '-c', // colors
      ...moreArgs,
      ...(bug.runArgs || EmptyArray)
    ];
    if (argArray.includes(undefined)) {
      throw new Error(bug.debugTag + ' - invalid `Project bug`. Arguments must not include `undefined`: ' + JSON.stringify(argArray));
    }
    return argArray.join(' ');      //.map(s => `"${s}"`).join(' ');
  }

  /**
   * @see https://mochajs.org/#command-line-usage
   */
  getJestRunArgs(bug, moreArgs = EmptyArray) {
    // bugArgs
    const argArray = [
      ...moreArgs,
      ...(bug.runArgs || EmptyArray)
    ];
    if (argArray.includes(undefined)) {
      throw new Error(bug.debugTag + ' - invalid `Project bug`. Arguments must not include `undefined`: ' + JSON.stringify(argArray));
    }
    return argArray.join(' ');      //.map(s => `"${s}"`).join(' ');
  }

  // ###########################################################################
  // logging
  // ###########################################################################

  log(...args) {
    this.logger.debug(...args);
  }

  // ###########################################################################
  // misc
  // ###########################################################################

  get debugTag() {
    return `Project ${this.name}`;
  }

  toString() {
    return `[${this.debugTag}]`;
  }
}