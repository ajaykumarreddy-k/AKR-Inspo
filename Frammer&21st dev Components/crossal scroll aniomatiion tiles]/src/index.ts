import { serve } from "bun";
import index from "./index.html";

const preferredPort = Number(process.env.PORT) || 3000;

function startServer(initialPort: number) {
  let port = initialPort;
  let server;

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      server = serve({
        port: port,
        routes: {
          // Serve index.html for all unmatched routes.
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

      return server;
    } catch (err: any) {
      if (err?.code === "EADDRINUSE" || err?.message?.includes("in use")) {
        console.warn(`⚠️ Port ${port} is currently in use, trying port ${port + 1}...`);
        port += 1;
      } else {
        throw err;
      }
    }
  }

  throw new Error(`Could not find an open port starting from ${initialPort}`);
}

const server = startServer(preferredPort);

console.log(`🚀 Server running at ${server.url}`);
