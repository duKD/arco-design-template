import { defineStore } from "pinia";
import { AuthState } from "./types";
import { Notification } from "@arco-design/web-vue";
import { getMenuList } from "@/api/user";
import { allAppRoutes } from "@/router/routes";
import {
  getAuthMenuList,
  getFlatMenuList,
  getShowMenuList,
  getAllBreadcrumbList,
} from "@/utils/index";
import { initDynamicRouter } from "@/router/utils/dynamicRouter";

const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    authMenuList: [],
    authMenuPathList: [],
    hasInitDynamicRouter: false,
  }),

  getters: {
    appAsyncMenus(state: AuthState) {
      return state.authMenuList;
    },
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: (state) => getFlatMenuList(state.authMenuList),
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
    showMenuListGet: (state) => getShowMenuList(state.authMenuList),
    // 递归处理后的所有面包屑导航列表
    allBreadcrumbList: (state) => getAllBreadcrumbList(state.authMenuList),
  },

  actions: {
    // 从后台获取 菜单列表
    async fetchServerMenuConfig() {
      try {
        const { data } = await getMenuList();
        this.authMenuPathList = data;
        // 获取后台用户角色对应的菜单权限
        this.authMenuList = getAuthMenuList(allAppRoutes, data);

        // 动态添加路由
        initDynamicRouter();
        this.hasInitDynamicRouter = true;
      } catch (error) {
        Notification.error({
          id: "menuNotice",
          content: "添加动态路由失败",
          closable: true,
        });
      }
    },
    // 清除菜单列表
    clearAuthMenuList() {
      this.authMenuList = [];
      this.hasInitDynamicRouter = false;
    },
  },
});

export default useAuthStore;
