import index from "./index.html"

const port = parseInt(process.env.PORT || "3000")

const server = Bun.serve({
  port,
  routes: {
    "/*": index,
  },
  development: {
    hmr: true,
    console: true,
  },
})

console.log(`http://localhost:${server.port}`)
