import { serve } from "bun";
import index from "./index.html";
import fs from "fs";
import path from "path";

// --- Auto-setup logic to move .md files and generate React components ---
try {
  const rootDir = process.cwd();
  const mdFilesDir = path.join(rootDir, 'md files');
  const destAnimations = path.join(rootDir, 'src', 'components', 'animations');

  if (!fs.existsSync(mdFilesDir)) {
    fs.mkdirSync(mdFilesDir, { recursive: true });
    fs.mkdirSync(destAnimations, { recursive: true });

    const files = fs.readdirSync(rootDir).filter(f => 
      f.endsWith('.md') && 
      !['README.md', 'CLAUDE.md', 'implementation_plan.md', 'task.md', 'walkthrough.md'].includes(f)
    );

    if (fs.existsSync(path.join(rootDir, 'scrollwaypointsmd'))) {
      files.push('scrollwaypointsmd');
    }

    let processedCount = 0;
    for (const file of files) {
      const oldPath = path.join(rootDir, file);
      const content = fs.readFileSync(oldPath, 'utf-8');
      const baseName = file.endsWith('.md') ? file.replace('.md', '') : file;
      
      const newMdPath = path.join(mdFilesDir, file.endsWith('.md') ? file : `${file}.md`);
      fs.renameSync(oldPath, newMdPath);
      
      const isReact = content.includes('import ') || content.includes('export default') || content.includes('use client');
      if (isReact) {
        fs.writeFileSync(path.join(destAnimations, `${baseName}.tsx`), content);
      }
      processedCount++;
    }
    console.log(`✅ Successfully moved ${processedCount} markdown files to 'md files/' and generated React components!`);
  }
} catch (e) {
  console.error("Auto-setup failed:", e);
}
// ------------------------------------------------------------------------

const server = serve({
  port: 0,
  routes: {
    "/*": index,

    "/code/:id": async req => {
      const id = req.params.id; 
      const baseName = id.replace('.txt', '');
      
      // Look for the file in the new 'md files' folder!
      let f = Bun.file(`./md files/${baseName}.md`);
      if (await f.exists()) {
        return new Response(f, { headers: { "Content-Type": "text/plain" } });
      }
      
      f = Bun.file(`./md files/${baseName.toLowerCase()}.md`);
      if (await f.exists()) {
        return new Response(f, { headers: { "Content-Type": "text/plain" } });
      }
      
      f = Bun.file(`./md files/${baseName}md.md`);
      if (await f.exists()) {
        return new Response(f, { headers: { "Content-Type": "text/plain" } });
      }
      
      f = Bun.file(`./md files/${baseName}`);
      if (await f.exists()) {
        return new Response(f, { headers: { "Content-Type": "text/plain" } });
      }

      return new Response(`// Error: File ${baseName}.md not found in 'md files' folder`, { status: 404 });
    },

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
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

console.log(`🚀 Server running at ${server.url}`);
