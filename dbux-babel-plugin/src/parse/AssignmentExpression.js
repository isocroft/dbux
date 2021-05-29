import { getPresentableString } from '../helpers/pathHelpers';
import BaseNode from './BaseNode';


// ###########################################################################
// util
// ###########################################################################

const PluginsByType = {
  Identifier: 'LValIdentifier',
  ObjectPattern: 'LValPattern',
  ArrayPattern: 'LValPattern',
  MemberExpression: 'LValME'
};

function getLValPlugin(node) {
  const [lvalPath] = node.getChildPaths();
  const lvalType = lvalPath.node.type;
  const pluginName = PluginsByType[lvalType];
  if (!pluginName) {
    node.logger.error(`unknown lval type: ${lvalType} for "${getPresentableString(lvalPath)}"`);
  }
  return pluginName;
}

// ###########################################################################
// AssignmentExpression
// ###########################################################################

/**
 * 
 */
export default class AssignmentExpression extends BaseNode {
  static children = ['left', 'right'];
  static plugins = [
    getLValPlugin
  ];

  /**
   * @returns {BaseNode}
   */
  getDeclarationNode() {
    const [leftNode] = this.getChildNodes();
    return leftNode.getDeclarationNode();
  }
}