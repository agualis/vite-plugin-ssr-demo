import { pipeToWebWritable, pipeToNodeWritable } from '@vue/server-renderer'

import { escapeInject, PageContextBuiltIn, stampPipe } from 'vite-plugin-ssr'
import { createPageApp } from './app'
import type { Writable } from 'stream'
import { PageContext } from './types'
import "/assets/styles/index.css";

// By default we do not want to pre-render our pages.
// This makes pre-rendering opt-in by adding `doNotPrerender = false` to pages.
export const doNotPrerender = true;

export { render }
export { passToClient }

// See https://vite-plugin-ssr.com/data-fetching
const passToClient = [
  "urlParsed",
  "pageProps",
  "is404"
];

async function render(pageContext: PageContext & PageContextBuiltIn) {
  const app = createPageApp(pageContext, false)

  // Streaming is optional: we can use renderToString() instead.
  const pipe = isWorker()
    ? (writable: WritableStream) => {
        pipeToWebWritable(app, {}, writable)
      }
    : // While developing, we use Vite's development sever instead of a Cloudflare worker. Instead of `pipeToNodeWritable()`, we could as well use `renderToString()`.
      (writable: Writable) => {
        pipeToNodeWritable(app, {}, writable)
      }
  stampPipe(pipe, isWorker() ? 'web-stream' : 'node-stream')

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <body>
        <div id="app">${pipe}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true
    }
  }
}

// https://github.com/cloudflare/wrangler2/issues/1481
// https://community.cloudflare.com/t/how-to-detect-the-cloudflare-worker-runtime/293715
function isWorker() {
  return (
    // @ts-ignore
    typeof WebSocketPair !== 'undefined' || typeof caches !== 'undefined'
  )
}
