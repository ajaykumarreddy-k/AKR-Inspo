import { serve } from "bun";
import index from "./index.html";

const initialPort = Number(process.env.PORT) || 3000;

function startServer(port: number) {
  try {
    return serve({
      port,
      routes: {
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
        hmr: true,
        console: true,
      },
    });
  } catch (err: any) {
    if (err?.code === "EADDRINUSE" && port < initialPort + 10) {
      console.warn(`⚠️ Port ${port} is in use, falling back to ${port + 1}...`);
      return startServer(port + 1);
    }
    throw err;
  }
}

const server = startServer(initialPort);
console.log(`🚀 Server running at ${server.url}`);
