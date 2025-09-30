import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        feed: "feed.html",
        login: "login.html",
        single: "single.html",
        register: "register.html",
        update: "update.html",
        profile: "profile.html",
        "profile-user": "profile-user.html",
      },
    },
  },
});
