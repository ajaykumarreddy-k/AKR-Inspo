import { serve } from "bun";

// Build the frontend script
const build = await Bun.build({
  entrypoints: ["./frontend.tsx"],
  outdir: "./dist",
});

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response(Bun.file("./index.html"), {
        headers: { "Content-Type": "text/html" },
      });
    }
    if (url.pathname === "/frontend.tsx" || url.pathname === "/frontend.js") {
      const file = Bun.file("./dist/frontend.js");
      return new Response(file, {
        headers: { "Content-Type": "application/javascript" },
      });
    }
    return new Response("Not found", { status: 404 });
  },
});

console.log("Server running at http://localhost:3000");
