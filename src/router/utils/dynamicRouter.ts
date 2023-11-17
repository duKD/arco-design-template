import router from "@/router";
import { RouteRecordRaw } from "vue-router";
import { Notification } from "@arco-design/web-vue";
import { useAuthStore } from "@/store";
import { clearToken } from "@/utils/auth";

// 引入 views 文件夹下所有 vue 文件
// const modules = import.meta.glob("@/views/**/*.vue");

/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async () => {
  const authStore = useAuthStore();

  try {
    // 1.判断当前用户有没有菜单权限
    if (!authStore.authMenuList.length) {
      Notification.error({
        title: "无权限访问",
        content: "当前账号无任何菜单权限，请联系系统管理员！",
        duration: 3000,
      });
      clearToken();
      // 重新登录
      router.replace("/login");
      return Promise.reject("No permission");
    }

    // 2.获取菜单列表 动态添加路由
    authStore.authMenuList.forEach((item: any) => {
      router.addRoute(item as unknown as RouteRecordRaw);
    });
  } catch (error) {
    // 当按钮 || 菜单请求出错时，重定向到登陆页
    clearToken();
    // 重新登录
    router.replace("/login");
    authStore.clearAuthMenuList();
    return Promise.reject(error);
  }
};
