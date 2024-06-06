/**
 * Diff 算法原理
 * 1. 基本概念
 *    diff 算法的主要目标是比较两个虚拟 DOM 树，找出它们之间的差异，并生成相应的补丁，以便高效地更新真实 DOM。以下是 diff 算法的基本步骤：
 *    - 节点类型比较：首先比较节点的类型，如果类型不同，则直接替换整个节点。
 *    - 属性比较：如果节点类型相同，则比较节点的属性，找出新增、修改和删除的属性。
 *    - 子节点比较：比较节点的子节点，递归处理子节点的差异。
 * 2. 节点类型比较
 *    - 节点类型不同，意味着它们的结构和内容完全不同，因此需要替换整个节点。这是 diff 算法中最简单的一种情况
 * 3. 属性比较
 *    - 对于类型相同的节点，需要进一步比较它们的属性。属性的差异分为三种情况：
 *      - 新增属性：新的虚拟 DOM 节点有，但旧的没有
 *      - 修改属性：新旧虚拟 DOM 节点都有，但值不同
 *      - 删除属性：旧的虚拟 DOM 节点有，但新的没有
 *      - 其他情况：不需要处理
 * 4. 子节点比较
 *    - 子节点的比较是 diff 算法的核心和复杂部分。主要有以下几种情况：
 *      - 子节点数量相同：逐一比较每个子节点的差异
 *      - 子节点数量不同：根据实际情况添加或删除子节点
 * 5. 批量应用补丁
 *    - 通过批量应用补丁，可以减少对 DOM 的直接操作，从而提高性能。
 * 6. 最小化 DOM 操作
 *    - 通过批量应用补丁，减少对 DOM 的直接操作，从而提高性能。
 * 7. 性能优化
 *    为了提高 diff 算法的性能，React 等库采用了一些优化策略：
      Keyed Diff：在列表中使用 key 属性，唯一标识每个子节点，帮助算法高效地找到节点变化的位置。
      最小化 DOM 操作：通过批量应用补丁，减少对 DOM 的直接操作，从而提高性能。
 */

// ----------------------------------简单实现-----------------------------------------

import { Patch, PatchType } from '../types/patch';
import { VNode } from '../types/vNode';

function diffProps(
  oldProps: { [key: string]: any },
  newProps: { [key: string]: any },
) {
  const patches: { [key: string]: any } = {};
  for (const key in oldProps) {
    if (oldProps[key] !== newProps[key]) {
      patches[key] = newProps[key];
    }
  }
  for (const key in newProps) {
    if (!oldProps.hasOwnProperty(key)) {
      patches[key] = newProps[key];
    }
  }
  return patches;
}

function diffChildren(oldChildren: any[], newChildren: any[]) {
  const patches: any[] = [];
  const length = Math.max(oldChildren.length, newChildren.length);
  for (let i = 0; i < length; i++) {
    patches.push(diff(oldChildren[i], newChildren[i]));
  }
  return patches;
}

/**
 * Diff 算法主方法
 * @param oldVNode 旧虚拟DOM
 * @param newVNode 新虚拟DOM
 * @returns patch 补丁，用于更新真实DOM
 */
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
