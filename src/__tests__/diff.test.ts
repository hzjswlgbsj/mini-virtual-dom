import { diff } from '../diff/diff';
import { PatchType } from '../types/patch';
import { VNode } from '../types/vNode';

test('diff - replace node', () => {
  const oldVNode: VNode = { type: 'div', props: {}, children: [] };
  const newVNode: VNode = { type: 'span', props: {}, children: [] };
  const patches = diff(oldVNode, newVNode);
  expect(patches).toEqual([{ type: PatchType.REPLACE, newVNode }]);
});

test('diff - props', () => {
  const oldVNode: VNode = { type: 'div', props: { id: 'old' }, children: [] };
  const newVNode: VNode = { type: 'div', props: { id: 'new' }, children: [] };
  const patches = diff(oldVNode, newVNode);
  expect(patches).toEqual([{ type: PatchType.PROPS, props: { id: 'new' } }]);
});
