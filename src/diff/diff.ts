import { Patch, PatchType } from '../types/patch';
import { VNode } from '../types/vNode';

// 比较属性的差异
function diffProps(
  oldProps: { [key: string]: any },
  newProps: { [key: string]: any },
): { [key: string]: any } {
  const patches: { [key: string]: any } = {};

  for (const key in newProps) {
    if (newProps[key] !== oldProps[key]) {
      patches[key] = newProps[key];
    }
  }

  for (const key in oldProps) {
    if (!(key in newProps)) {
      patches[key] = null;
    }
  }

  return patches;
}

// 比较子节点的差异
function diffChildren(
  oldChildren: (VNode | string)[] = [],
  newChildren: (VNode | string)[] = [],
): Patch[] {
  const patches: Patch[] = [];
  const maxLen = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLen; i++) {
    const oldChild = oldChildren[i];
    const newChild = newChildren[i];

    if (!oldChild) {
      patches.push({ type: PatchType.REPLACE, newVNode: newChild });
    } else if (!newChild) {
      patches.push({ type: PatchType.REMOVE });
    } else if (typeof oldChild === 'string' || typeof newChild === 'string') {
      if (oldChild !== newChild) {
        patches.push({ type: PatchType.REPLACE, newVNode: newChild });
      }
    } else if (oldChild.type === newChild.type) {
      const childPatches = diff(oldChild, newChild);
      if (childPatches.length > 0) {
        patches.push({
          type: PatchType.UPDATE,
          index: i,
          patches: childPatches,
        });
      }
    } else {
      patches.push({ type: PatchType.REPLACE, newVNode: newChild });
    }
  }

  return patches;
}

// 主 diff 函数
export function diff(oldVNode: VNode, newVNode: VNode): Patch[] {
  const patches: Patch[] = [];

  // 节点类型不同，替换节点
  if (oldVNode.type !== newVNode.type) {
    patches.push({ type: PatchType.REPLACE, newVNode });
  } else {
    // 比较 props
    const propPatches = diffProps(oldVNode.props, newVNode.props);
    if (Object.keys(propPatches).length > 0) {
      patches.push({ type: PatchType.PROPS, props: propPatches });
    }

    // 比较 children
    const childrenPatches = diffChildren(oldVNode.children, newVNode.children);
    if (childrenPatches.length > 0) {
      patches.push({ type: PatchType.CHILDREN, children: childrenPatches });
    }
  }

  return patches;
}
