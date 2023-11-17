import { DEFAULT_LAYOUT } from "../base";
import { AppRouteRecordRaw } from "../types";

const DASHBOARD: AppRouteRecordRaw = {
  path: "/dashboard",
  name: "dashboard",
  component: DEFAULT_LAYOUT,
  redirect: "/dashboard/workplace",
  meta: {
    locale: "仪表盘",
    requiresAuth: true,
    icon: "icon-dashboard",
    order: 0,
  },
  children: [
    {
      path: "/dashboard/workplace",
      name: "Workplace",
      component: () => import("@/views/dashboard/workplace/index.vue"),
      meta: {
        locale: "工作台",
        requiresAuth: true,
        roles: ["*"],
      },
    },
  ],
};

export default DASHBOARD;
