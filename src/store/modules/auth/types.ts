import { RouteRecordRaw } from "vue-router";

/* AuthState */
export interface AuthState {
  // 菜单路由列表
  authMenuList: RouteRecordRaw[];
  // 后端给的 权限 列表
  authMenuPathList: string[];
  // 是否完成动态路由初始化
  hasInitDynamicRouter: boolean;
}
