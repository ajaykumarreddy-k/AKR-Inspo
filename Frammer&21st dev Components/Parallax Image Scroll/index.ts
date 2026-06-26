import index from "./index.html";

const server = Bun.serve({
  port: 3000,
  hostname: "localhost",
  routes: {
    "/": index,
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log(`\n  ➜  Local:   http://localhost:${server.port}/`);
