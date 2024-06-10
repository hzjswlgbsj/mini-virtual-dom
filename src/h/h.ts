import { VNode } from '../types/index';

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
