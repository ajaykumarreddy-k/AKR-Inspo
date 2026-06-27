import { serve } from "bun";

const server = serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/") return new Response(Bun.file("index.html"));
    if (url.pathname === "/style.css") return new Response(Bun.file("style.css"));
    if (url.pathname === "/script.js") return new Response(Bun.file("script.js"));
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Listening on http://localhost:${server.port}`);