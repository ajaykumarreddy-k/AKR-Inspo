import { serve } from "bun";
import index from "./index.html";

const defaultPort = Number(process.env.PORT) || 3000;

function startServer(portToUse: number) {
  return serve({
    port: portToUse,
    routes: {
      "/*": index,

      "/api/hello": {
        async GET(req) {
          return Response.json({
            message: "Hello, world!",
            method: "GET",
          });
        },
        async PUT(req) {
          return Response.json({
            message: "Hello, world!",
            method: "PUT",
          });
        },
      },

      "/api/hello/:name": async (req) => {
        const name = req.params.name;
        return Response.json({
          message: `Hello, ${name}!`,
        });
      },
    },

    development: process.env.NODE_ENV !== "production" && {
      hmr: true,
      console: true,
    },
  });
}

let server;
try {
  server = startServer(defaultPort);
} catch (err) {
  console.warn(`⚠️ Port ${defaultPort} occupied, starting fallback server...`);
  server = startServer(0);
}

console.log(`🚀 Server running at ${server.url}`);
