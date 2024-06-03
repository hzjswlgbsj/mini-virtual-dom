import { h } from '../h';

test('creates a vnode with type, props, and children', () => {
  const vnode = h('div', { id: 'foo' }, 'Hello, World!');
  expect(vnode).toEqual({
    type: 'div',
    props: { id: 'foo' },
    children: ['Hello, World!'],
  });
});

test('creates a vnode with nested children', () => {
  const childNode = h('div', { id: 'foo' }, 'Hello, World!');
  const vnode = h('div', { id: 'bar' }, childNode);
  expect(vnode).toEqual({
    type: 'div',
    props: { id: 'bar' },
    children: [childNode],
  });
});
