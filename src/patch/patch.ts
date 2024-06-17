import { Patch } from '../types/index';
import { PatchType, VNode } from '../types/index';

/**
 * 应用补丁到真实 DOM 上
 * @param node 真实 DOM 节点
 * @param patches 补丁数组
 * @returns 更新后的 DOM 节点
 */
function patch(node: Node, patches: Patch[]): Node {
  patches.forEach((patch) => {
    switch (patch.type) {
      case PatchType.REPLACE:
        // 替换整个节点
        break;

      case PatchType.PROPS:
        // 更新节点的子节点
        setProps(node, patch.props);
        break;

      case PatchType.CHILDREN:
        // 更新节点的子节点
        updateChildren(node, patch.children);
        break;

      case PatchType.REMOVE:
        // 移除节点
        break;

      case PatchType.UPDATE:
        // 更新具体的子节点
        break;
    }
  });
  return node;
}

/**
 * 创建一个真实的 DOM 节点
 * @param VNode 虚拟 DOM 节点
 * @returns 真实 DOM 节点
 */
function createElement(vNode: VNode): Node {
  const el = document.createElement(vNode.type);
  setProps(el, vNode.props);
  vNode.children.forEach((child) => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(createElement(child));
    }
  });
  return el;
}

/**
 * 更新 DOM 节点的属性
 * @param node 真实 DOM 节点
 * @param props 属性对象
 */
function setProps(node: Node, props: { [key: string]: any }) {
  for (const key in props) {
    const value = props[key];
    if (value === null) {
      node.removeAttribute(key);
    } else {
      node.setAttribute(key, value);
    }
  }
}

/**
 * 递归地对每个子节点应用补丁
 * @param parentNode 父节点
 * @param patches 补丁数组
 */
function updateChildren(parentNode: Node, patches: Patch[]) {
  let childNodes = Array.from(parentNode.childNodes);
  patches.forEach((patchData, index) => {
    patch(childNodes[index], patchData.patches);
  });
}

export { patch };
