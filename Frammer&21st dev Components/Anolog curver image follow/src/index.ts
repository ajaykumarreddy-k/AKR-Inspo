import { serve } from "bun";
import index from "./index.html";

const initialPort = Number(process.env.PORT) || 3000;

function startServer(port: number) {
  try {
    const server = serve({
      port,
      reusePort: true,
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
        },
      },

      development: process.env.NODE_ENV !== "production" && {
        // Enable browser hot reloading in development
        hmr: true,
        // Echo console logs from the browser to the server
        console: true,
      },
    });

    console.log(`🚀 Server running at http://localhost:${server.port}`);
    return server;
  } catch (err: any) {
    if (err?.code === "EADDRINUSE" && port < 3010) {
      console.warn(`⚠️ Port ${port} is currently in use. Trying port ${port + 1}...`);
      return startServer(port + 1);
    }
    throw err;
  }
}

startServer(initialPort);
