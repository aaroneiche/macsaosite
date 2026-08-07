import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
// import vike from 'vike/plugin'

const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStringify)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    {
      name: "markdown-loader",
      transform(code, id) {
        if (id.slice(-3) === ".md") {
          // Compile Markdown to HTML at build time so pages don't need to
          // parse Markdown on every request.
          const html = markdownProcessor.processSync(code).toString();
          return `export default ${JSON.stringify(html)};`;
        }
      }
    }
  ],
   base: '/macsao/',
})
