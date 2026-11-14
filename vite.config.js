import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes the build work from any path: GitHub Pages project sites, Netlify, Vercel, or a plain static server.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
