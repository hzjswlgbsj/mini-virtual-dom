export enum PatchType {
  /** 替换整个节点 */
  REPLACE = 'REPLACE',
  /** 更新节点的属性 */
  PROPS = 'PROPS',
  /** 更新节点的子节点 */
  CHILDREN = 'CHILDREN',
  /** 更新具体的子节点 */
  UPDATE = 'UPDATE',
  /** 移除节点 */
  REMOVE = 'REMOVE',
}

export type Patch =
  | { type: PatchType.REPLACE; newVNode?: VNode | string }
  | { type: PatchType.PROPS; props: { [key: string]: any } }
  | { type: PatchType.CHILDREN; children: Patch[] }
  | { type: PatchType.UPDATE; index: number; patches: Patch[] }
  | { type: PatchType.REMOVE };

export interface VNode {
  type: string;
  props: Record<string, any>;
  children: (VNode | string)[];
}
