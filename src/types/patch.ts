import { VNode } from './vNode';

export enum PatchType {
  REPLACE,
  PROPS,
  CHILDREN,
}

export type Patch =
  | { type: PatchType.REPLACE; newVNode?: VNode }
  | { type: PatchType.PROPS; props: { [key: string]: any } }
  | { type: PatchType.CHILDREN; children: Patch[] };
