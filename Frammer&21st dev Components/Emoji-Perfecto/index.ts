import index from "./index.html"

const port = parseInt(process.env.PORT || "3000")

Bun.serve({
  port,
  routes: {
    "/": index,
  },
  development: {
    hmr: true,
    console: true,
  },
})

console.log(`\n  ✓ Server running at http://localhost:${port}\n`)
