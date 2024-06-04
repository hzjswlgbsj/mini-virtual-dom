/**
 * @jest-environment jsdom
 */
import { render } from '../render';
import { VNode } from '../types/vNode';

test('render a simple VNode', () => {
  const vNode: VNode = {
    type: 'div',
    props: { id: 'foo' },
    children: ['Hello, World!'],
  };
  const container = document.createElement('div');
  render(vNode, container);
  expect(container.innerHTML).toBe('<div id="foo">Hello, World!</div>');
});

test('render a VNode with nested children', () => {
  const vNode: VNode = {
    type: 'div',
    props: { id: 'foo' },
    children: [
      'Hello, ',
      {
        type: 'span',
        props: {},
        children: ['World!'],
      },
    ],
  };
  const container = document.createElement('div');
  render(vNode, container);
  expect(container.innerHTML).toBe(
    '<div id="foo">Hello, <span>World!</span></div>',
  );
});

test('render a VNode with event handler', () => {
  const handleClick = jest.fn();
  const vNode: VNode = {
    type: 'button',
    props: { onClick: handleClick },
    children: ['Click me'],
  };
  const container = document.createElement('div');
  render(vNode, container);

  const button = container.querySelector('button');
  button?.click();

  expect(handleClick).toHaveBeenCalled();
  expect(container.innerHTML).toBe('<button>Click me</button>');
});

test('render a VNode with style as object', () => {
  const vNode: VNode = {
    type: 'div',
    props: { style: { color: 'red', fontSize: '16px' } },
    children: ['Styled text'],
  };
  const container = document.createElement('div');
  render(vNode, container);

  const div = container.querySelector('div');
  expect(div).not.toBeNull();
  expect(div?.style.color).toBe('red');
  expect(div?.style.fontSize).toBe('16px');
  expect(container.innerHTML).toBe(
    '<div style="color: red; font-size: 16px;">Styled text</div>',
  );
});

test('render a VNode with style as string', () => {
  const vNode: VNode = {
    type: 'div',
    props: { style: 'color: blue; font-size: 20px;' },
    children: ['Styled text with string'],
  };
  const container = document.createElement('div');
  render(vNode, container);

  const div = container.querySelector('div');
  expect(div).not.toBeNull();
  expect(div?.style.color).toBe('blue');
  expect(div?.style.fontSize).toBe('20px');
  expect(container.innerHTML).toBe(
    '<div style="color: blue; font-size: 20px;">Styled text with string</div>',
  );
});
