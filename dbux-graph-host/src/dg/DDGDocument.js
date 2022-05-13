// import ThemeMode from '@dbux/graph-common/src/shared/ThemeMode';
import traceSelection from '@dbux/data/src/traceSelection/index';
import HostComponentEndpoint from '../componentLib/HostComponentEndpoint';

export default class DDGDocument extends HostComponentEndpoint {
  // TODO-M

  // ###########################################################################
  // init
  // ###########################################################################

  init() {
    this.createOwnComponents();

    this.addDisposable(traceSelection.onTraceSelectionChanged(() => {
      this.timelineView.refresh();
    }));
    this.timelineView.refresh();
  }

  update() {
  }

  createOwnComponents() {
    this.timelineView = this.children.createComponent('DDGTimelineView');
  }

  // /** ###########################################################################
  //  * util
  //  *  #########################################################################*/

  // getIconUri(fileName, modeName = null) {
  //   if (!fileName) {
  //     return null;
  //   }
  //   if (!modeName) {
  //     const themeMode = this.componentManager.externals.getThemeMode();
  //     modeName = ThemeMode.getName(themeMode).toLowerCase();
  //   }
  //   return this.componentManager.externals.getClientResourceUri(`${modeName}/${fileName}`);
  // }

  // ###########################################################################
  // state + context
  // ###########################################################################

  makeInitialState() {
    return {
      themeMode: this.componentManager.externals.getThemeMode()
    };
  }

  shared() {
    return {
      context: {
        doc: this
      }
    };
  }

  public = {

  };
}
