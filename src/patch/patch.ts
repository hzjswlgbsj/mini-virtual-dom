import { Patch, PatchType, VNode } from '../types/index';

/**
 * 应用补丁到真实 DOM 上
 * @param node 真实 DOM 节点
 * @param patches 补丁数组
 * @returns 更新后的 DOM 节点
 */
function patch(node: Node, patches: Patch[]): Node {
  patches.forEach((patch) => {
    switch (patch.type) {
      case PatchType.PROPS:
        setProps(node as Element, patch.props);
        break;
    }
  });
  return node;
}

/**
 * 更新 DOM 节点的属性
 * @param node 真实 DOM 节点
 * @param props 属性对象
 */
function setProps(node: Element, props: { [key: string]: any }) {
  for (const key in props) {
    const value = props[key];
    if (value === null) {
      node.removeAttribute(key);
    } else if (key === 'style') {
      // TODO: 处理 style 属性
    } else if (key.startsWith('on')) {
      // TODO: 处理事件
    } else {
      node.setAttribute(key, value);
    }
  }
}

export { patch };
