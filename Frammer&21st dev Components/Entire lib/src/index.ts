import { serve } from "bun";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/components": async (req) => {
      try {
        const componentsDir = path.resolve(import.meta.dir, "../components");
        const files = await readdir(componentsDir);
        
        const components = await Promise.all(
          files
            .filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"))
            .map(async (file) => {
              const code = await readFile(path.join(componentsDir, file), "utf-8");
              return { name: file.replace(/\.tsx?$/, ""), fileName: file, code };
            })
        );
        
        return Response.json(components);
      } catch (err) {
        console.error("Error reading components:", err);
        return Response.json({ error: "Could not read components" }, { status: 500 });
      }
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
