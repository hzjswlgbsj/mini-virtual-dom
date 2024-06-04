import { VNode } from './types/vNode';

/**
 * 处理当前元素的 style 属性
 * @param el 当前处理的元素
 * @param value style属性的值
 */
function handleStyleProp(
  el: HTMLElement,
  value: string | { [key: string]: string },
): void {
  // 允许传入一个对象，也允许传入一个字符串
  if (typeof value === 'string') {
    el.setAttribute('style', value);
  } else if (typeof value === 'object') {
    for (const [styleName, styleValue] of Object.entries(value)) {
      (el.style as any)[styleName] = styleValue;
    }
  }
}

function handleEventProp(el: HTMLElement, key: string, value: any) {
  const eventName = key.slice(2).toLowerCase();
  el.addEventListener(eventName, value);
}

function handleAttributeProp(el: HTMLElement, key: string, value: any) {
  if (typeof value === 'boolean') {
    if (value) {
      el.setAttribute(key, '');
    }
  } else {
    el.setAttribute(key, value);
  }
}

export function render(vNode: VNode, container: HTMLElement) {
  const { type, props, children } = vNode;
  const el = document.createElement(type);

  // 处理 props
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const value = props[key];
      if (key === 'style') {
        handleStyleProp(el, value);
      } else if (key.startsWith('on')) {
        handleEventProp(el, key, value);
      } else {
        handleAttributeProp(el, key, value);
      }
    }
  }

  // 处理 children
  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else {
        render(child, el);
      }
    });
  }

  if (container instanceof HTMLElement) {
    container.appendChild(el);
  }
}
