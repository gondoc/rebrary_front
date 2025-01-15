import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs-extra";
import path, { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log("env ", env);
  return {
    plugins: [react(), moveIndexHtml(), tsconfigPaths()],
    resolve: {
      mainFields: ["browser"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      chunkSizeWarningLimit: 3600,
      sourcemap: false,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            // @ts-ignore
            let extType = assetInfo.name.split(".").at(1);
            // @ts-ignore
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "img";
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
        },
      },
      outDir: "../src/main/resources/static", // Spring Boot의 정적 리소스 디렉토리
      assetsDir: "assets",
      emptyOutDir: true,
      assetsInlineLimit: 0,
    },
  };
});

// 빌드 후 index.html을 이동시키는 플러그인
function moveIndexHtml() {
  return {
    name: "move-index-html",
    closeBundle: async () => {
      const srcPath = resolve(
        __dirname,
        "../src/main/resources/static/index.html",
      );
      const destPath = resolve(
        __dirname,
        "../src/main/resources/templates/index.html",
      );
      await fs.copy(srcPath, destPath, { overwrite: true });
      console.log("index.html has been moved to templates directory");
    },
  };
}
