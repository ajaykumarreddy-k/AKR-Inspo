import { serve } from "bun";
import index from "./index.html";

const initialPort = Number(process.env.PORT) || 3000;

function startServer(port: number, maxTries = 5): ReturnType<typeof serve> {
  try {
    return serve({
      port,
      routes: {
        // Serve index.html for all unmatched routes.
        "/*": index,

        "/api/hello": {
          async GET() {
            return Response.json({
              message: "Hello, world!",
              method: "GET",
            });
          },
          async PUT() {
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
  } catch (err: any) {
    if (err?.code === "EADDRINUSE" && maxTries > 0) {
      console.warn(`⚠️ Port ${port} is in use. Trying port ${port + 1}...`);
      return startServer(port + 1, maxTries - 1);
    }
    throw err;
  }
}

const server = startServer(initialPort);
console.log(`🚀 Server running at ${server.url}`);
