import type { Router, RouteRecordNormalized } from "vue-router";
import NProgress from "nprogress"; // progress bar
import { useAuthStore } from "@/store";
import { WHITE_LIST, IGNORE_PATH } from "../constants";

// 针对来自服务端的菜单配置进行处理
export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    console.log(3333, router.getRoutes());

    // 先判断是否属于白名单
    if (IGNORE_PATH.includes(to.path)) {
      next();
      return;
    }

    const authStore = useAuthStore();
    // 针对来自服务端的菜单配置进行处理

    // 判断是否生成了 动态路由
    if (authStore.hasInitDynamicRouter) {
      next();
      return;
    }

    // 生成动态路由
    await authStore.fetchServerMenuConfig();
    next({ ...to, replace: true });
  });
}
