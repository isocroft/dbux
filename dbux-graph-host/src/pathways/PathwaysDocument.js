import PathwaysMode from '@dbux/data/src/pathways/PathwaysMode';
import ThemeMode from '@dbux/graph-common/src/shared/ThemeMode';
import HostComponentEndpoint from '../componentLib/HostComponentEndpoint';
import PathwaysView from './PathwaysView';
import Toolbar from './Toolbar';

/** @typedef {import('@dbux/projects/src/dataLib/PathwaysDataProvider').default} PathwaysDataProvider */

class PathwaysDocument extends HostComponentEndpoint {
  toolbar;

  isAnalyzing = () => {
    return PathwaysMode.is.Analyze(this.state.pathwaysMode);
  }

  /**
   * @type {PathwaysDataProvider}
   */
  get pdp() {
    return this.componentManager.externals.getPathwaysDataProvider();
  }

  update() {
    this.toolbar.forceUpdate();
  }

  // ###########################################################################
  // init
  // ###########################################################################

  init() {
    this.state.pathwaysMode = PathwaysMode.Normal;

    this.createOwnComponents();

    const {
      onPracticeSessionStateChanged
    } = this.componentManager.externals;

    // listen to pathways data changes
    this._addHooks();
    this.addDisposable(onPracticeSessionStateChanged(this._addHooks));
  }

  _addHooks = () => {
    const { pdp } = this;
    const sessionId = pdp?.sessionId;
    if (sessionId !== this.sessionId) {
      // stop listening on previous events
      this.userActionsListener?.();

      // register new event handler
      this.addDisposable(
        this.userActionsListener =
        // pathwaysDataProvider.onAnyData(this.view.refresh)
        pdp?.onAnyData(this.view.refresh)
      );

      this.view.reset();
      this.view.refresh();
      this.sessionId = sessionId;
    }
  }

  createOwnComponents() {
    this.toolbar = this.children.createComponent(Toolbar);
    this.view = this.children.createComponent(PathwaysView);
  }

  /** ###########################################################################
   * util
   *  #########################################################################*/

  getIconUri(fileName, modeName = null) {
    if (!fileName) {
      return null;
    }
    if (!modeName) {
      const themeMode = this.componentManager.externals.getThemeMode();
      modeName = ThemeMode.getName(themeMode).toLowerCase();
    }
    return this.componentManager.externals.getClientResourceUri(`${modeName}/${fileName}`);
  }

  // ###########################################################################
  // state + context
  // ###########################################################################

  makeInitialState() {
    return {
      showTime: true,
      themeMode: this.componentManager.externals.getThemeMode()
    };
  }

  shared() {
    return {
      context: {
        doc: this,
        themeMode: this.state.themeMode,
        analyzing: this.isAnalyzing
      }
    };
  }

  public = {
    async cyclePathwaysMode() {
      // remove all existing children
      this.view.reset();

      // set new mode + initialize new stuff
      const mode = PathwaysMode.nextValue(this.state.pathwaysMode);
      this.setState({
        pathwaysMode: mode
      });

      this.view.refresh();
      await this.view.waitForRefresh();

      // switch (mode) {
      //   case PathwaysMode.Analyze:
      //     await this.componentManager.externals.decorateVisitedTraces();
      //     break;
      //   default:
      //     await this.componentManager.externals.stopDecorating();
      //     break;
      // }
    },

    async refresh() {
      // TODO: allow a less intrusive re-render
      // remove all existing children
      this.view.reset();
      this.view.refresh();
      await this.view.waitForRefresh();
    }
  };
}

export default PathwaysDocument;