import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";

import { REDIRECT_MAIN, NOT_FOUND_ROUTE } from "./routes/base";
import createRouteGuard from "./guard";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    REDIRECT_MAIN,
    NOT_FOUND_ROUTE,
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});

export default router;
