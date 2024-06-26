/* eslint no-console: 0 */

const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const t = require('@babel/types');
// const nodeExternals = require('webpack-node-externals');
const virtualTypes = require('@babel/traverse/lib/path/lib/virtual-types.js');

// add some of our own good stuff
require('./dbux-register-self');
require('../dbux-common/src/util/prettyLogs');
const { writeFileRegistryFile } = require('../dbux-common-node/src/util/codeGenUtil');

const MonoRoot = path.resolve(__dirname, '..');

// ###########################################################################
// write "file-registry files"
// ###########################################################################

// write parser registry
function writeDirectoryIndex(dir, pred, ...moreArgs) {
  const parserDir = path.resolve(MonoRoot, dir).replace(/\\/g, '/');
  const indexFile = '_registry.js';
  writeFileRegistryFile(indexFile, parserDir, pred, ...moreArgs);
  console.log(`Generated ${dir}/${indexFile}.`);
}

function isCapitalized(s) {
  return s[0] === s[0].toUpperCase();
}

writeDirectoryIndex(
  'dbux-babel-plugin/src/parse',
  (name) => isCapitalized(name) && (t['is' + name] || virtualTypes[name]),
  `import { newLogger } from '@dbux/common/src/log/logger';`,
  function init(Clazz) {
    Clazz.logger = newLogger(`parse/${Clazz.name}`);
  }
);

writeDirectoryIndex(
  'dbux-babel-plugin/src/parse/plugins', 
  (name) => isCapitalized(name),
  '',
  null,
  (name) => {
    if (name === 'Function_') {
      /**
       * NOTE: since `Function` is a global name, obfuscators (such as terser) are unhappy if we keep it.
       * -> instead, use a different name, but register it as-is.
       */
      return `Function_ as Function`;
    }
    return name;
  }
);