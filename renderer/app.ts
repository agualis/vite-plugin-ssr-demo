import { PageContextBuiltIn } from "vite-plugin-ssr";
import { PageContext } from "./types";
import { createSSRApp, createApp, h } from "vue";
import LayoutComponent from "/components/Layout.vue";
import { VueQueryPlugin } from '@tanstack/vue-query'

export function createPageApp(pageContext: PageContextBuiltIn & PageContext, clientOnly: boolean) {
  const { Page: PageComponent, pageProps } = pageContext;
  const createAppFunc = clientOnly ? createApp : createSSRApp;

  const AppComponent = {
    render() {
      const renderLayoutSlot = () => h(PageComponent, pageProps || {});
      return h(LayoutComponent, pageProps || {}, { default: renderLayoutSlot });
    }
  };

  const app = createAppFunc(AppComponent);
  app.provide("pageContext", pageContext);
  app.use(VueQueryPlugin)

  return app;
}
