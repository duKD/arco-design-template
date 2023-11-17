import { createPinia } from "pinia";
import useAppStore from "./modules/app";
import useUserStore from "./modules/user";
import useTabBarStore from "./modules/tab-bar";
import useAuthStore from "./modules/auth";

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useAuthStore };
export default pinia;
