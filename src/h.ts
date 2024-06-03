import { VNode } from './types/vnode';

export function h(
  type: string,
  props: { [key: string]: any } = {},
  ...children: (VNode | string)[]
): VNode {
  return {
    type,
    props,
    children,
  };
}
