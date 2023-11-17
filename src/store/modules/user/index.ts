import { defineStore } from "pinia";
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
} from "@/api/user";
import { setToken, clearToken } from "@/utils/auth";
import { removeRouteListener } from "@/utils/route-listener";
import { UserState } from "./types";
import useAuthStore from "../auth";

const useUserStore = defineStore("user", {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: "",
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === "user" ? "admin" : "user";
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();
      this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        // 设置 token
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const authStore = useAuthStore();
      // 清除用户信息
      this.resetInfo();
      // 删除 token
      clearToken();
      // 移除 事件监听
      removeRouteListener();
      // 清除 菜单信息
      authStore.clearAuthMenuList();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
