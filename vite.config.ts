import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/kanji-drill/",   // ★リポ名に合わせる（末尾スラッシュ必須）
});