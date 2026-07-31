import { serve } from "bun";
import index from "./index.html";

const PORT = Number(process.env.PORT) || 3000;

const server = serve({
  port: PORT,
  routes: {
    "/*": index,
  },
  async fetch(req) {
    const url = new URL(req.url);

    // Serve public static files (e.g. /stickers/*.png)
    if (url.pathname.startsWith("/stickers/")) {
      const filePath = `./public${url.pathname}`;
      const file = Bun.file(filePath);
      if (await file.exists()) {
        return new Response(file);
      }
    }

    return new Response("Not Found", { status: 404 });
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
