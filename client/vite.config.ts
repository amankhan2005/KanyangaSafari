import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import { fileURLToPath } from "node:url";

// `vite build --mode preview` produces one self-contained HTML file with sample data (no backend) for design review.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isPreview = mode === "preview";
  return {
    plugins: [react(), ...(isPreview ? [viteSingleFile()] : [])],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@shared": fileURLToPath(new URL("../shared", import.meta.url)),
      },
    },
    server: {
      port: 5173,
      fs: { allow: [".."] },
      proxy: { "/api": { target: env.VITE_DEV_API_PROXY || "http://localhost:4000", changeOrigin: true } },
    },
    preview: {
      port: 4173,
      proxy: { "/api": { target: env.VITE_DEV_API_PROXY || "http://localhost:4000", changeOrigin: true } },
    },
    build: { outDir: isPreview ? "dist-preview" : "dist", sourcemap: !isPreview },
  };
});
