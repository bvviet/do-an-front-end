import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@layouts",
        replacement: path.resolve(__dirname, "src/layouts"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "src/assets"),
      },
      {
        find: "@configs",
        replacement: path.resolve(__dirname, "src/configs"),
      },
      {
        find: "@contexts",
        replacement: path.resolve(__dirname, "src/contexts"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "src/hooks"),
      },
      {
        find: "@images",
        replacement: path.resolve(__dirname, "src/images"),
      },
      {
        find: "@layouts",
        replacement: path.resolve(__dirname, "src/layouts"),
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "src/pages"),
      },
      {
        find: "@services",
        replacement: path.resolve(__dirname, "src/services"),
      },
      {
        find: "@store",
        replacement: path.resolve(__dirname, "src/store"),
      },
      {
        find: "@types",
        replacement: path.resolve(__dirname, "src/types"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "src/utils"),
      },
    ],
  },
});
