import { newLogger } from '@dbux/common/src/log/logger';
import ProjectBase from '../projectLib/ProjectBase';
import Project from '../projectLib/Project';
import { runRandomTests } from './mocha/randomTests';

// eslint-disable-next-line no-unused-vars
const { log, debug, warn, error: logError } = newLogger('experiments/run');


/** @typedef {import('../ProjectsManager').default} ProjectsManager */
/** @typedef {import('../../Bug').default} Bug */

class ConfigProject extends Project {
  /**
   * @param {*} manager 
   * @param {Project} projectCfg 
   */
  constructor(manager, projectCfg) {
    super(manager, projectCfg.name);
  }
}

export default function run() {
  const runCfg = {

  };
  const defaultProjectCfg = {

  };
  const manager = TODO;

  /**
   * @type {Array.<ProjectBase>}
   */
  const projectConfigs = [
    {
      name: 'sequelize',

      /**
       * Provided for each individual project.
       */
      gitRemote: 'sequelize/sequelize.git',
      // /**
      //  * A specific commit hash or tag name to refer to (if wanted)
      //  */
      // gitCommit;
      // nodeVersion;

      // NOTE: pick the test command that is most likely to yield useful results?
      testRunCommand: 'yarn test-integration',

      // loadBugs() {}
      // decorateBug() {}
      // makeBuilder() {}
      // afterInstall() {}
    }
  ];

  const projects = projectConfigs.map(projectCfg => new ConfigProject(manager, projectCfg));

  for (const project of projects) {
    // readPackageJson
    try {
      runRandomTests(project, runCfg);
    }
    catch (err) {
      logError(err);
    }
  }
}
