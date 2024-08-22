/*
 * @Author: yjl
 * @Date: 2024-08-21 09:09:24
 * @LastEditors: yjl
 * @Description: 描述
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { presetTypography, presetUno } from "unocss";
import UnoCSS from "unocss/vite";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      presets: [presetUno(), presetTypography()],
    }),
    viteMockServe({
      ignore: /^_/,
      mockPath: "mock",
      watchFiles: true,
      localEnabled: false,
      prodEnabled: true,
      injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';
      
      setupProdMockServer();
      `,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssTarget: "chrome80",
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        manualChunks: {
          vendor: ["react", "react-dom"],
          antd: ["antd", "@ant-design/icons"],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
