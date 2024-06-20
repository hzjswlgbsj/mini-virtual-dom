/**
 * @jest-environment jsdom
 */
import { Patch, PatchType, VNode } from '../types/index';
import { patch } from '../patch/patch';

test('patch - update props', () => {
  // 创建一个虚拟 DOM 节点
  const vNode: VNode = { type: 'div', props: { id: 'old' }, children: [] };

  // 创建一个真实的 DOM 节点
  const el = document.createElement(vNode.type);
  el.setAttribute('id', 'old');

  // 定义补丁
  const patches: Patch[] = [{ type: PatchType.PROPS, props: { id: 'new' } }];

  // 应用补丁
  patch(el, patches);

  // 断言真实的 DOM 节点的属性已更新
  expect(el.getAttribute('id')).toBe('new');
});
