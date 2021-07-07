import ClientComponentEndpoint from '../../componentLib/ClientComponentEndpoint';

// ###########################################################################
// animation computations
// ###########################################################################

/**
 * Padding (in pixels) between the edge of the viewport and node target position
 */
const focusPadding = 30;

/**
 * Padding (in pixels) added by scrollbars at the bottom and the right
 */
const scrollPadding = 10;

/**
 * @param {*} p position
 * @param {*} s size
 * @param {*} wp window position
 * @param {*} ws window size
 */
function computeDelta1D(p, s, wp, ws) {
  wp += focusPadding;
  ws -= focusPadding;

  let dLeft = wp - p;
  if (dLeft > 0) {
    // too far left
    return dLeft;
  }

  // too far right
  const dRight = (wp + ws) - (p + s);   // distance to right edge
  if (dRight < 0) {
    return Math.max(dLeft, dRight); // NOTE: both numbers are negative, and we want the one closer to 0
  }

  // we are already in the right spot
  return 0;
}

/**
 * Computes amount of pixels by which a node is outisde the viewport.
 */

// [scroll fix]
function computeDelta(node) {
  const nodeBounds = node.getBoundingClientRect();

  // start underneath the toolbar
  let toolbar = document.querySelector("#toolbar");
  let barY = toolbar.getBoundingClientRect().bottom;

  return {
    x: computeDelta1D(nodeBounds.x, nodeBounds.width, 0, window.innerWidth - scrollPadding),
    y: computeDelta1D(nodeBounds.y, nodeBounds.height, barY, window.innerHeight - barY - scrollPadding)
  };
}

// ###########################################################################
// FocusController
// ###########################################################################

export default class FocusController extends ClientComponentEndpoint {
  get panzoom() {
    return this.context.graphDocument.panzoom;
  }

  init() {
    // this can be used to verigfy if it is animating
    this.targetDOM = null;
  }

  /**
   * @param {ClientComponentEndpoint} node
   */
  slideToNode = (node) => {
    // Note: Slide to given node. referance https://codepen.io/relign/pen/qqZxqW?editors=0011
    if (!node) {
      this.stopSlide();
      return;
    }

    if (!node.el) {
      this.logger.error(`Trying to focus on node without DOM element: ${JSON.stringify(node)}`);
      return;
    }

    this.slide(node.el);
  }

  slide = (target) => {
    if (!target) {
      this.stopSlide();
      return;
    }

    const targetDOM = this.targetDOM = target;

    const nodeBounds = target.getBoundingClientRect();
    if (!nodeBounds.height && !nodeBounds.width) {
      this.logger.error(`Trying to slide to unrevealed DOM: ${targetDOM.outerHTML}, ${JSON.stringify(nodeBounds)}`);
      return;
    }

    // [scroll fix]
    const delta = computeDelta(target);
    // console.log('\n');
    // console.log('scroll position:', 'Top:', this.panzoom.getTransform().y, 'Left:', this.panzoom.getTransform().x);
    // console.log('delta:', 'x', delta.x, 'y:', delta.y);

    if (!(Math.abs(delta.x) + Math.abs(delta.y))) {
      // nothing to do here
      return;
    }

    const slideData = {
      startTime: performance.now(),
      startX: this.panzoom.getTransform().x,
      startY: this.panzoom.getTransform().y,
      delta,
      animTime: 0.1
    };

    requestAnimationFrame(() => this._step(target, slideData));
  }

  stopSlide() {
    this.targetDOM = null;
  }

  _step = (targetDOM, slideData) => {
    if (targetDOM !== this.targetDOM) {
      // target changed, stop animation
      return;
    }
    const {
      startTime,
      startX,
      startY,
      delta: {
        x,
        y
      },
      animTime
    } = slideData;

    const progress = Math.min(1.0, (performance.now() - startTime) / (animTime * 1000));

    // [scroll fix]
    this.panzoom.moveTo(startX - x * progress, startY - y * progress);
    if (progress < 1.0) {
      requestAnimationFrame(() => this._step(targetDOM, slideData));
    }
    else {
      this.targetDOM = null;
    }
  }

  getAsyncNodeEl({ applicationId, runId, threadId }) {
    const data = {
      'application-id': applicationId,
      'run-id': runId,
      'thread-id': threadId,
    };
    const dataSelector = Object.entries(data).map(([key, val]) => `[data-${key}="${val || ''}"]`).join('');
    const selector = `.async-node${dataSelector}`;
    return document.querySelector(selector);
  }

  public = {
    slideToNode: this.slideToNode,
    /**
     * @param {{applicationId: number, runId: number, threadId: number}} selector 
     * @param {boolean} ignoreFailed 
     */
    focusAsyncNode: (selector, ignoreFailed = false) => {
      const asyncNodeEl = this.getAsyncNodeEl(selector);
      if (!asyncNodeEl) {
        !ignoreFailed && this.logger.error(`Cannot find asyncNode with data ${JSON.stringify(selector)} when trying to focus`);
      }
      else {
        this.slide(asyncNodeEl);
      }
    },
    /**
     * @param {{applicationId: number, runId: number, threadId: number}} selector 
     * @param {boolean} ignoreFailed 
     */
    selectAsyncNode: (selector, ignoreFailed = false) => {
      document.querySelectorAll('.async-node-selected').forEach(node => {
        node.classList.remove('async-node-selected');
      });
      if (selector) {
        const asyncNodeEl = this.getAsyncNodeEl(selector);
        if (!asyncNodeEl) {
          !ignoreFailed && this.logger.error(`Cannot find asyncNode with data ${JSON.stringify(selector)} when trying to select`);
        }
        else {
          asyncNodeEl.classList.add('async-node-selected');
        }
      }
    }
  }
}