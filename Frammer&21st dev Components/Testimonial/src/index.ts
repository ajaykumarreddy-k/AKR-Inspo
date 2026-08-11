import { serve } from "bun";
import index from "./index.html";

const initialPort = Number(process.env.PORT) || 3000;

function startServer(port: number) {
  try {
    const server = serve({
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

    console.log(`🚀 Server running at ${server.url}`);
    return server;
  } catch (err: any) {
    if (err?.code === "EADDRINUSE" || err?.message?.includes("EADDRINUSE")) {
      console.log(`⚠️ Port ${port} is currently in use. Retrying on port ${port + 1}...`);
      return startServer(port + 1);
    }
    throw err;
  }
}

startServer(initialPort);
