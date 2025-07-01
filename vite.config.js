import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: process.env.PORT || 5173, // 👈 Let Render pick the port
    host: true,                     // 👈 Listen on all interfaces (0.0.0.0)
  }
});
