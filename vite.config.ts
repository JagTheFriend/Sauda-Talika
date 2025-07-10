import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["/app-icon/light.png", "/app-icon/dark.png"],
      manifest: {
        name: "Sauda Talika",
        short_name: "Sauda Talika",
        description:
          "Sauda Talika - Making grocery shopping and meal planning effortless through intelligent list management and AI-powered recipe suggestions.",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        start_url: "/",
        shortcuts: [
          {
            name: "Add List",
            short_name: "Add List",
            description: "Add a new list",
            url: "/dashboard",
          },
          {
            name: "Search Recipes",
            short_name: "Search Recipes",
            description: "Search for recipes using AI",
            url: "/recipes",
          },
          {
            name: "About Us",
            short_name: "About Us",
            description: "About Sauda Talika",
            url: "/about",
          },
        ],
        icons: [
          {
            src: "/app-icon/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/app-icon/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
