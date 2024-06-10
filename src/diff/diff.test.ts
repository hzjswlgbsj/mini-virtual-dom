/**
 * @jest-environment jsdom
 */
import { PatchType, VNode } from '../types/index';
import { diff } from './diff';

test('diff - replace node', () => {
  const oldVNode: VNode = { type: 'div', props: {}, children: [] };
  const newVNode: VNode = { type: 'span', props: {}, children: [] };
  const patches = diff(oldVNode, newVNode);
  expect(patches).toEqual([{ type: PatchType.REPLACE, newVNode }]);
});

test('diff - props', () => {
  const oldVNode: VNode = { type: 'div', props: { id: 'foo' }, children: [] };
  const newVNode: VNode = { type: 'div', props: { id: 'bar' }, children: [] };
  const patches = diff(oldVNode, newVNode);
  expect(patches).toEqual([{ type: PatchType.PROPS, props: { id: 'bar' } }]);
});

test('diff - children', () => {
  const oldVNode: VNode = {
    type: 'div',
    props: {},
    children: [{ type: 'p', props: {}, children: ['Old'] }],
  };
  const newVNode: VNode = {
    type: 'div',
    props: {},
    children: [{ type: 'p', props: {}, children: ['New'] }],
  };
  const patches = diff(oldVNode, newVNode);
  expect(patches).toEqual([
    {
      type: PatchType.CHILDREN,
      children: [
        {
          type: PatchType.UPDATE,
          index: 0,
          patches: [
            {
              type: PatchType.CHILDREN,
              children: [
                {
                  type: PatchType.REPLACE,
                  newVNode: 'New',
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
});

test('diff - children and props', () => {
  const oldVNode: VNode = {
    type: 'div',
    props: { id: 'old' },
    children: [{ type: 'p', props: {}, children: ['Old'] }],
  };
  const newVNode: VNode = {
    type: 'div',
    props: { id: 'new' },
    children: [{ type: 'p', props: {}, children: ['New'] }],
  };
  const patches = diff(oldVNode, newVNode);
  expect(patches).toEqual([
    {
      type: PatchType.PROPS,
      props: { id: 'new' },
    },
    {
      type: PatchType.CHILDREN,
      children: [
        {
          type: PatchType.UPDATE,
          index: 0,
          patches: [
            {
              type: PatchType.CHILDREN,
              children: [
                {
                  type: PatchType.REPLACE,
                  newVNode: 'New',
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
});
