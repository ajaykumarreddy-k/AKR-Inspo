import { serve } from "bun";
import plugin from "bun-plugin-tailwind";
import index from "./index.html";

// Register Tailwind plugin for Bun bundler
Bun.plugin(plugin);

const desiredPort = Number(process.env.PORT) || 3000;

function startServer(port: number) {
  try {
    const server = serve({
      port,
      routes: {
        "/*": index,
      },
      development: process.env.NODE_ENV !== "production" && {
        hmr: true,
        console: true,
      },
    });
    console.log(`🚀 Server running at http://localhost:${server.port}`);
    return server;
  } catch (err: any) {
    if (err?.code === "EADDRINUSE" && !process.env.PORT) {
      console.log(`⚠️ Port ${port} in use, trying ${port + 1}...`);
      return startServer(port + 1);
    }
    throw err;
  }
}

startServer(desiredPort);
