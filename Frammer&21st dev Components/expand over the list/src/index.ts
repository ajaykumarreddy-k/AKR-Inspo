import { serve } from "bun";
import index from "./index.html";

const initialPort = Number(process.env.PORT || 3000);

function startServer(startPort: number, maxAttempts = 50) {
  for (let port = startPort; port < startPort + maxAttempts; port++) {
    try {
      const server = serve({
        port,
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

          "/api/hello/:name": async req => {
            const name = req.params.name;
            return Response.json({
              message: `Hello, ${name}!`,
            });
          },
        },

        development: process.env.NODE_ENV !== "production" && {
          // Enable browser hot reloading in development
          hmr: true,

          // Echo console logs from the browser to the server
          console: true,
        },
      });

      return server;
    } catch (err: any) {
      if (err?.code === "EADDRINUSE" || err?.message?.includes("in use")) {
        console.log(`Port ${port} in use, trying next port...`);
        continue;
      }
      throw err;
    }
  }

  // Fallback to OS assigned port if all ports in range were taken
  return serve({
    port: 0,
    routes: { "/*": index },
    development: process.env.NODE_ENV !== "production" && { hmr: true, console: true },
  });
}

const server = startServer(initialPort);

console.log(`🚀 Server running at ${server.url}`);
