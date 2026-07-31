import { serve } from "bun";
import index from "./index.html";

function startServer(initialPort = 3000) {
  let port = Number(process.env.PORT) || initialPort;
  let server;
  const maxAttempts = 10;

  for (let i = 0; i < maxAttempts; i++) {
    try {
      server = serve({
        port: port + i,
        routes: {
          "/*": index,
          "/api/hello": {
            async GET() {
              return Response.json({ message: "Hello, world!" });
            },
          },
        },
        development: process.env.NODE_ENV !== "production" && {
          hmr: true,
          console: true,
        },
      });
      break;
    } catch (e: any) {
      if (i === maxAttempts - 1) throw e;
    }
  }

  if (server) {
    console.log(`🚀 Server running at http://localhost:${server.port}`);
  }
}

startServer();
