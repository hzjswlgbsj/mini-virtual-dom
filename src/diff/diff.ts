import { Patch, PatchType, VNode } from '../types/index';

/**
 * 比较两个虚拟 DOM 节点的属性，返回一个描述属性变化的补丁对象。
 * 首先遍历新属性，找出新增和修改的属性。
 * 然后遍历旧属性，找出被删除的属性。
 * @param oldProps 旧的属性
 * @param newProps 新的属性
 * @returns 补丁
 */
function diffProps(
  oldProps: { [key: string]: any },
  newProps: { [key: string]: any },
): { [key: string]: any } {
  const patches: { [key: string]: any } = {};

  // 遍历新属性，找出新增和修改的属性
  for (const key in newProps) {
    if (newProps[key] !== oldProps[key]) {
      patches[key] = newProps[key];
    }
  }

  // 遍历旧属性，找出删除的属性
  for (const key in oldProps) {
    if (!(key in newProps)) {
      patches[key] = null;
    }
  }

  return patches;
}

/**
 * 比较两个虚拟 DOM 节点的子节点，返回一个描述子节点变化的补丁数组。
 * 通过遍历最大长度的子节点数组，逐一比较每对子节点。
 * 如果旧子节点不存在，表示新增子节点。
 * 如果新子节点不存在，表示移除子节点。
 * 如果子节点是字符串类型，直接比较字符串是否相同。
 * 如果子节点类型相同，递归调用 diff 函数比较子节点。
 * 如果子节点类型不同，表示替换子节点。
 * @param oldChildren 旧的子节点 VNode
 * @param newChildren 新的子节点 VNode
 * @returns Patch[]
 */
function diffChildren(
  oldChildren: (VNode | string)[] = [],
  newChildren: (VNode | string)[] = [],
): Patch[] {
  const patches: Patch[] = [];
  const maxLen = Math.max(oldChildren.length, newChildren.length);

  // 遍历子节点，逐一比较
  for (let i = 0; i < maxLen; i++) {
    const oldChild = oldChildren[i];
    const newChild = newChildren[i];

    // 如果旧子节点不存在，则新增子节点
    if (!oldChild) {
      patches.push({ type: PatchType.REPLACE, newVNode: newChild });
    }
    // 如果新子节点不存在，则移除子节点
    else if (!newChild) {
      patches.push({ type: PatchType.REMOVE });
    }
    // 如果子节点是字符串类型，直接比较字符串
    else if (typeof oldChild === 'string' || typeof newChild === 'string') {
      if (oldChild !== newChild) {
        patches.push({ type: PatchType.REPLACE, newVNode: newChild });
      }
    }
    // 如果子节点类型相同，递归比较子节点
    else if (oldChild.type === newChild.type) {
      const childPatches = diff(oldChild, newChild);
      if (childPatches.length > 0) {
        patches.push({
          type: PatchType.UPDATE,
          index: i,
          patches: childPatches,
        });
      }
    }
    // 如果子节点类型不同，替换子节点
    else {
      patches.push({ type: PatchType.REPLACE, newVNode: newChild });
    }
  }

  return patches;
}

/**
 * 主 diff 函数，用于比较两个虚拟 DOM 树，返回描述树变化的补丁数组。
 * 首先比较根节点类型，如果类型不同，则替换整个节点。
 * 如果根节点类型相同，分别调用 diffProps 和 diffChildren 函数比较节点的属性和子节点，生成相应的补丁。
 * @param oldVNode 旧的虚拟 DOM
 * @param newVNode 新的虚拟 DOM
 * @returns Patch[]
 */
export function diff(oldVNode: VNode, newVNode: VNode): Patch[] {
  const patches: Patch[] = [];

  // 如果节点类型不同，替换整个节点
  if (oldVNode.type !== newVNode.type) {
    patches.push({ type: PatchType.REPLACE, newVNode });
  } else {
    // 比较节点的属性
    const propPatches = diffProps(oldVNode.props, newVNode.props);
    if (Object.keys(propPatches).length > 0) {
      patches.push({ type: PatchType.PROPS, props: propPatches });
    }

    // 比较节点的子节点
    const childrenPatches = diffChildren(oldVNode.children, newVNode.children);
    if (childrenPatches.length > 0) {
      patches.push({ type: PatchType.CHILDREN, children: childrenPatches });
    }
  }

  return patches;
}
