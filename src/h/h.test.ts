import { h } from './h';

test('creates a vNode with type, props, and children', () => {
  const vNode = h('div', { id: 'foo' }, 'Hello, World!');
  expect(vNode).toEqual({
    type: 'div',
    props: { id: 'foo' },
    children: ['Hello, World!'],
  });
});

test('creates a vNode with nested children', () => {
  const childNode = h('div', { id: 'foo' }, 'Hello, World!');
  const vNode = h('div', { id: 'bar' }, childNode);
  expect(vNode).toEqual({
    type: 'div',
    props: { id: 'bar' },
    children: [childNode],
  });
});
