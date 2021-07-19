
/**
 * https://github.com/vuejs/vue/blob/dev/src/core/vdom/vnode.js
 */
export default class VNode {
  constructor(tag, data, children, text, elm) {
    // 当前节点的标签名
    this.tag = tag;
    // 当前节点的一些数据信息，比如attrs、props等
    this.data = data;
    // 当前节点的子节点列表，VNode数组
    this.children = children;
    // 当前节点的文本
    this.text = text;
    // 当前接口对应的真是DOM节点
    this.elm = elm;
  }
}

export function createEmptyVNode() {
  return new VNode(undefined, undefined, undefined, '', undefined);
}

export function createTextVNode(text) {
  return new VNode(undefined, undefined, undefined, text, undefined);
}

export function cloneVNode(node) {
  return new VNode(node.tag, node.data, node.children, node.text, node.elm);
}