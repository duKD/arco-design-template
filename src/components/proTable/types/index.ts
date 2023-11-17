import { TableColumnInstance } from "@arco-design/web-vue";

type TableColumn = TableColumnInstance extends { $props: infer Props }
  ? Props
  : never;

// export interface ColumnProps<T = any>
//   extends Partial<
//     Omit<TableColumnCtx<T>, "children" | "renderCell" | "renderHeader">
//   > {
//   tag?: boolean; // 是否是标签展示
//   isShow?: boolean; // 是否显示在表格当中
//   search?: SearchProps | undefined; // 搜索项配置
//   enum?: EnumProps[] | ((params?: any) => Promise<any>); // 枚举类型（字典）
//   isFilterEnum?: boolean; // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
//   fieldNames?: FieldNamesProps; // 指定 label && value && children 的 key 值
//   headerRender?: (scope: HeaderRenderScope<T>) => VNode; // 自定义表头内容渲染（tsx语法）
//   render?: (scope: RenderScope<T>) => VNode | string; // 自定义单元格内容渲染（tsx语法）
//   _children?: ColumnProps<T>[]; // 多级表头
// }

export type ColumnProps = Partial<
  Omit<TableColumn, "children" | "renderCell" | "renderHeader">
>;

//Grid
export type BreakPoint = "xs" | "sm" | "md" | "lg" | "xl";

export type Responsive = {
  span?: number;
  offset?: number;
};
