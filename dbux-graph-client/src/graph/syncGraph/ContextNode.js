import { compileHtmlElement, decorateClasses } from '../../util/domUtil';
// import { isMouseEventPlatformModifierKey } from '../util/keyUtil';
import { getPlatformModifierKeyString } from '../../util/platformUtil';
import ClientComponentEndpoint from '../../componentLib/ClientComponentEndpoint';

let choicingIndicator;
const ContextBlinkAnimationTime = 4000;
class ContextNode extends ClientComponentEndpoint {
  createEl() {
    return compileHtmlElement(/*html*/`
      <div class="context-node flex-row">
        <div class = "indicator-cont">
          <div data-el="indicator" class="indicator"></div>
        </div>
        <div class="full-width flex-column">
          <div class="content">
            <div class="flex-row">
              <div class="flex-row">
                <div class="mode-btn-wrapper flex-row">
                  <button data-el="previousModeButton" class="btn graph-mode-button">
                    <img data-el="previousModeButtonImg">
                  </button>
                  <button data-el="nextModeButton" class="btn graph-mode-button">
                    <img data-el="nextModeButtonImg">
                  </button>
                </div>
                <div data-el="callLabel" class="ellipsis-20 dbux-link"></div>
                <div data-el="title" class="flex-row cross-axis-align-center">
                  <div data-el="contextLabel" class="ellipsis-20 dbux-link"></div>
                </div>
                <span data-el="errorLabel"></span>
                <!--div data-el="selectedTraceIcon" class="darkred">
                  &nbsp;☩
                </div-->
                &nbsp;&nbsp;
                <!--button class="highlight-btn emoji" data-el="staticContextHighlightBtn"><span>💡</span></button-->
                <!--<button data-el="prevContextBtn" class="hidden">⇦</button>-->
                <!--<button data-el="nextContextBtn" class="hidden">⇨</button>-->
                <div class="loc-label context-loc-label ">
                  <span data-el="locLabel"></span>
                  <!--span data-el="parentLocLabel" class="dbux-link"></span-->
                </div>
                <div>
                  <span class="value-label" data-el="valueLabel"></span>
                </div>
                <div data-el="statsNTreePackages" class="context-stats" title="Amount of packages involved in subgraph"></div>
                <div data-el="statsNTreeFileCalled" class="context-stats" title="Amount of files involved in subgraph"></div>
                <div data-el="statsNTreeStaticContexts" class="context-stats" title="Amount of static contexts involved in subgraph"></div>
                <div data-el="statsNTreeContexts" class="context-stats" title="Amount of child contexts in subgraph"></div>
                <div data-el="statsNTreeTraces" class="context-stats" title="Amount of traces in subgraph (approximates the amount of executed statements/expressions)"></div>
              </div>
              <div class="flex-row">
              </div>
            </div>
          </div>
          <div class="full-width flex-row">
            <div class="node-left-padding"></div>
            <div data-mount="ContextNode,HoleNode" data-el="nodeChildren" class="node-children"></div>
          </div>
        </div>
      </div>
    `);
  }

  setupEl() {
    const {
      context: { applicationId, contextId, createdAt },
      rootContextId
    } = this.state;

    this.el.dataset.applicationId = applicationId;
    this.el.dataset.contextId = contextId;
    this.el.dataset.rootContextId = rootContextId;

    if (!(this.parent instanceof ContextNode)) {
      const animationEndTime = createdAt + ContextBlinkAnimationTime;
      const duration = animationEndTime - Date.now();
      if (duration > 0) {
        this.el.classList.add('blink-me');

        setTimeout(() => {
          this.el?.classList.remove('blink-me');
        }, duration);
      }
    }
  }

  update() {
    const {
      context: { applicationId, contextId },
      rootContextId,
      // realStaticContextid,
      backgroundStyle,
      contextLabel,
      contextLocLabel,
      callerTracelabel,
      valueLabel,
      isSelected,
      traceId,
      isSelectedTraceCallRelated,
      contextIdOfSelectedCallTrace,
      // packageName,
      visible,
      hasError,
    } = this.state;

    
    this.el.id = `application_${applicationId}-context_${contextId}`;
    this.el.style.background = backgroundStyle;
    this.els.contextLabel.textContent = contextLabel;

    this.els.locLabel.textContent = contextLocLabel && ` ${contextLocLabel}` || '';

    this.els.callLabel.textContent = callerTracelabel || '';
    this.els.valueLabel.textContent = valueLabel;
    this.els.errorLabel.textContent = hasError ? '🔥' : '';

    // generate stats label
    const {
      nTreeContexts,
      nTreeStaticContexts,
      nTreeFileCalled,
      nTreeTraces,
      nTreePackages,
    } = this.state;
    const {
      statsIconUris
    } = this.context.graphDocument.state;
    this.els.statsNTreeFileCalled.innerHTML = `<img src="${statsIconUris.nTreeFileCalled}" /><span>${nTreeFileCalled}</span>`;
    this.els.statsNTreeStaticContexts.innerHTML = `<img src="${statsIconUris.nTreeStaticContexts}" /><span>${nTreeStaticContexts}</span>`;
    this.els.statsNTreeContexts.innerHTML = `<img src="${statsIconUris.nTreeContexts}" /><span>${nTreeContexts}</span>`;
    this.els.statsNTreeTraces.innerHTML = `<img src="${statsIconUris.nTreeTraces}" /><span>${nTreeTraces}</span>`;
    this.els.statsNTreePackages.innerHTML = `<img src="${statsIconUris.nTreePackages}" /><span>${nTreePackages}</span>`;

    const prevSibling = this.el.previousElementSibling;
    const isAsyncRoot = prevSibling && parseInt(prevSibling.dataset.rootContextId, 10) !== rootContextId;

    decorateClasses(this.el, {
      'root-context-node': isAsyncRoot
    });

    decorateClasses(this.els.title, {
      'selected-trace': isSelected
    });

    // set indicator
    this.setIndicator(traceId, this.children.getComponents('ContextNode'), isSelectedTraceCallRelated, contextIdOfSelectedCallTrace, isSelected);

    // set popper
    const modKey = getPlatformModifierKeyString();
    this.els.contextLabel.setAttribute('data-tooltip', `${this.els.contextLabel.textContent} (${modKey} + click to select trace)`);
    this.els.callLabel.setAttribute('data-tooltip', `${this.els.callLabel.textContent} (${modKey} + click to select trace)`);
    // this.els.prevContextBtn.setAttribute('data-tooltip', 'Go to previous function execution');
    // this.els.nextContextBtn.setAttribute('data-tooltip', 'Go to next function execution');

    if (visible) {
      this.el.classList.remove('hidden');
    }
    else {
      this.el.classList.add('hidden');
    }
  }

  get hiddenNodeManager() {
    return this.context.graphRoot.controllers.getComponent('HiddenNodeManager');
  }

  hiddenByNode() {
    return this.hiddenNodeManager.getHiddenNodeHidingThis(this);
  }

  // ########################################
  // handle label on click
  // ########################################

  handleClickOnContext(evt) {
    if (evt.altKey) {
      // panning
      return;
    }
    // if (isMouseEventPlatformModifierKey(evt)) 
    // ctrl(meta) + click: select trace
    this.remote.selectFirstTrace();
    document.getSelection().removeAllRanges();
    // else {
    //   // click: show trace
    //   this.remote.goToFirstTrace();
    // }
  }

  handleClickOnCallTrace(evt) {
    if (evt.altKey) {
      // panning
      return;
    }
    // if (isMouseEventPlatformModifierKey(evt)) {
    // if (evt.shiftKey) {
    // ctrl(meta) + click: select trace
    this.remote.selectCallTrace();
    document.getSelection().removeAllRanges();
    // }
    // else {
    //   // click: show trace
    //   this.remote.goToParentTrace();
    // }
    // }
  }

  setIndicator(traceId, children, isSelectedTraceCallRelated, contextIdOfSelectedCallTrace, isSelected) {
    // check isSelected... if isSelected is false, this update is deselect old from focusControler -del
    if (!children || !traceId || !isSelected) {
      return;
    }

    //check indicator position -del
    let selectChild = children.map((x) => [x.state.context.parentTraceId, x.state.context.contextId]);
    let toggle = selectChild.findIndex(x => x[0] >= traceId);

    // check trace is selectedTraceCallRelated -del
    if (toggle !== -1 && isSelectedTraceCallRelated && contextIdOfSelectedCallTrace !== undefined) {
      toggle = selectChild.findIndex(x => x[1] === contextIdOfSelectedCallTrace);

      let newIndicator = children[toggle]?.el.querySelector('.indicator-cont');
      this.checkNewIndicator(newIndicator, 'set-calltrace');
    }
    else if (toggle !== -1) {
      let newIndicator = children[toggle]?.el.querySelector('.indicator-cont');
      this.checkNewIndicator(newIndicator, 'set-top');
    }
    else {
      let newIndicator = children[toggle]?.el.querySelector('.indicator-cont');
      this.checkNewIndicator(newIndicator, 'set-bottom');
    }
  }

  checkNewIndicator(newIndicator, newClass) {
    if (choicingIndicator !== newIndicator) {
      choicingIndicator?.classList.remove('set-top', 'set-bottom', 'set-calltrace');
      choicingIndicator = newIndicator;
      choicingIndicator?.classList?.add(newClass);
    }
  }

  on = {
    contextLabel: {
      click(evt) {
        this.handleClickOnContext(evt);
      }
    },
    // locLabel: {
    //   click(evt) {
    //     this.handleClickOnContext(evt);
    //   }
    // },
    callLabel: {
      click(evt) {
        this.handleClickOnCallTrace(evt);
      }
    },
    // parentLocLabel: {
    //   click(evt) {
    //     this.handleClickOnCallTrace(evt);
    //   }
    // },
    // staticContextHighlightBtn: {
    //   click(/* evt */) {
    //     this.remote.toggleStaticContextHighlight();
    //   }
    // },
    // prevContextBtn: {
    //   async click(/* evt */) {
    //     await this.remote.selectPreviousContextByStaticContext();
    //   }
    // },
    // nextContextBtn: {
    //   async click(/* evt */) {
    //     await this.remote.selectNextContextByStaticContext();
    //   }
    // }
  }
}
export default ContextNode;