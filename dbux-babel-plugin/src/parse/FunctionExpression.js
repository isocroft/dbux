import BaseNode from './BaseNode';

export default class FunctionExpression extends BaseNode {
  static plugins = [
    'Function',
    'StaticContext'
  ];
}
