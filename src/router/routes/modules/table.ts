import { DEFAULT_LAYOUT } from "../base";
import { AppRouteRecordRaw } from "../types";

const TABLE: any = {
  path: "/table",
  name: "table",
  component: DEFAULT_LAYOUT,
  redirect: "/table/index1",
  meta: {
    locale: "表格",
    icon: "icon-settings",
    requiresAuth: true,
    order: 3,
  },
  children: [
    {
      path: "/table/index1",
      name: "index1",
      component: () => import("@/views/table/index1.vue"),
      meta: {
        locale: "表格1",
        requiresAuth: true,
        roles: ["admin"],
      },
    },
    {
      path: "/table/index2",
      name: "index2",
      meta: {
        locale: "表格2",
        requiresAuth: true,
        roles: ["admin"],
      },
      children: [
        {
          path: "/table/index2/index3",
          name: "index3",
          meta: {
            locale: "表格3",
            requiresAuth: true,
            roles: ["admin"],
          },
          children: [
            {
              path: "/table/index2/index3/index4",
              name: "index4",
              meta: {
                locale: "表格4",
                requiresAuth: true,
                roles: ["admin"],
              },
              component: () => import("@/views/table/index2.vue"),
            },
          ],
        },
      ],
    },
  ],
};

export default TABLE;
