import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from "vite-svg-loader";
import checker from "vite-plugin-checker";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "./src"),
      },
      {
        find: "assets",
        replacement: resolve(__dirname, "../src/assets"),
      },
      {
        find: "vue",
        replacement: "vue/dist/vue.esm-bundler.js", // compile template
      },
    ],
  },
  plugins: [
    vue(),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    WindiCSS(),
    checker({
      vueTsc: true,
    }),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        //这种方法并不会处理用户在 script 中手动导入的组件，比如 Message 组件，用户仍需要手动导入组件对应的样式文件，例如 @arco-design/web-vue/es/message/style/css.js
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            "src/assets/style/breakpoint.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
