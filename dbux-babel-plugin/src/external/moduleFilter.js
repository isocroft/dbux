import isString from 'lodash/isString';
import isRegExp from 'lodash/isRegExp';
import { parseNodeModuleName } from '@dbux/common-node/src/util/pathUtil';
import EmptyArray from '@dbux/common/src/util/EmptyArray';
// import { requireDynamic } from '@dbux/common-node/src/util/requireUtil';

const Verbose = 1;
// const Verbose = 2;

function debugLog(...args) {
  let msg = `[@dbux/babel-plugin][moduleFilter] ${args.join(' ')}`;
  // msg = colors.gray(msg);

  // eslint-disable-next-line no-console
  console.log(msg);
}
function traceLog(...args) {
  let msg = `[@dbux/babel-plugin][moduleFilter] ${args.join(' ')}`;
  // msg = colors.gray(msg);

  // eslint-disable-next-line no-console
  console.trace(msg);
}

function shouldInstrument(input, whitelist, blacklist) {
  const white = (!whitelist || whitelist.some(regexp => regexp.test(input)));
  const black = (!blacklist || !blacklist.some(regexp => regexp.test(input)));
  const result = white && black;
  Verbose > 1 && debugLog('shouldInstrument', input, result, '\n  ', 
    JSON.stringify({ white, black, whitelist: whitelist?.map(x => x.toString()), blacklist: blacklist?.map(x => x.toString()) })
  );
  return result;
}

/** ###########################################################################
 * {@link moduleFilter}
 * ##########################################################################*/

/**
 * @param {*} options 
 * @param {boolean} includeDefault Is used internally to determine whether we are including or ignoring.
 */
export default function moduleFilter(options, includeDefault) {
  let {
    packageWhitelist,
    packageBlacklist,
    fileWhitelist,
    fileBlacklist
  } = options;

  const packageWhitelistRegExps = makeFullMatchRegExps(packageWhitelist);
  const packageBlacklistRegExps = makeFullMatchRegExps(packageBlacklist);
  const fileWhitelistRegExps = makeRegExps(fileWhitelist);
  const fileBlacklistRegExps = makeRegExps(fileBlacklist);

  Verbose > 1 && debugLog(
    `pw`, packageWhitelistRegExps?.join(','), 
    'pb', packageBlacklistRegExps?.join(','),
    'fw', fileWhitelistRegExps?.join(','),
    'fb', fileBlacklistRegExps?.join(',')
  );

  // Verbose > 1 && debugLog('moduleFilter', 
  //   requireDynamic.resolve/* ._resolveFilename */('@dbux/babel-plugin/package.json')
  // );


  return function _include(modulePath, ...otherArgs) {
    if (!modulePath) {
      Verbose && traceLog(`no modulePath - otherArgs = ${otherArgs}`);
      return undefined;
    }
    if (modulePath.match(/((dbux[-]runtime)|(@dbux[/\\]runtime))[/\\]/)) {
      // future-work: only debug these paths if we are targeting dbux directly; else this could cause infinite loops
      return !includeDefault;
    }

    // TODO: make `dist`, `.mjs` and @babel path settings configurable
    const unwanted = modulePath.match(/([/\\]dist[/\\])|(\.mjs$)|([/\\]@babel[/\\])|([/\\]babel[-]plugin.*[/\\])/);
    const packageName = parseNodeModuleName(modulePath);

    // console.debug('unwanted', modulePath, packageName, unwanted);

    if (unwanted ||
      (packageName &&
        !shouldInstrument(packageName, packageWhitelistRegExps, packageBlacklistRegExps))) {
      reportRegister(modulePath, false, 'package');
      return !includeDefault;
    }

    // modulePath = modulePath.toLowerCase();

    // const shouldInclude = includeDefault;
    const shouldInclude = (!fileWhitelistRegExps.length && !fileBlacklistRegExps.length) || 
      shouldInstrument(modulePath, fileWhitelistRegExps, fileBlacklistRegExps);
    reportRegister(modulePath, shouldInclude, 'file');
    return (shouldInclude && includeDefault) || (!shouldInclude && !includeDefault);
    // if (shouldInclude) {
    //   return includeDefault;
    // }
    // return !includeDefault;
  };
}


/** ###########################################################################
 * util
 *  #########################################################################*/

/**
 * Add `^` and `$` (if not exist) to `s` and convert to `RegExp`.
 * @param {string} s 
 */
function makeFullMatchRegExp(s) {
  s = s.trim();
  return new RegExp(`${s[0] === '^' ? '' : '^'}${s}${s[s.length - 1] === '$' ? '' : '$'}`);
}

function makeFullMatchRegExps(list) {
  return makeRegExps(list, makeFullMatchRegExp);
}

function defaultRegexpCreator(s) {
  return new RegExp(s);
}

function makeRegExps(list, toRegexp = defaultRegexpCreator) {
  if (!list) {
    return EmptyArray;
  }

  if (isString(list)) {
    list = list.trim().split(',')
      .map(toRegexp);
  }
  else if (isRegExp(list)) {
    list = [list];
  }
  else {
    list = Array.from(list)
      .map(s => isRegExp(s) ? s : toRegexp(s));
  }

  return list;
}


function reportRegister(modulePath, shouldInclude, what) {
  if (Verbose) {
    if (shouldInclude) {
      debugLog(`REGISTER`, modulePath, `(${what})`);
    }
    else if (Verbose > 1) {
      debugLog(`no-register`, modulePath, `(${what})`);
    }
  }
}