import index from "./index.html";

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOST || "0.0.0.0";

Bun.serve({
  hostname,
  port,
  routes: {
    "/*": index,
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log(`Server running at http://localhost:${port}`);
