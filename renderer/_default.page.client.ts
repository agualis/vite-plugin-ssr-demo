import { createPageApp } from './app'
import { PageContext } from './types'

export { render }

async function render(pageContext: PageContext) {
  const app = createPageApp(pageContext, false)
  app.mount('#app')
}

