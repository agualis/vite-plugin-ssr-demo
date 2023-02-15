import { PageContext } from './types';
import { createSSRApp, createApp, h } from 'vue';
import LayoutComponent from '@/components/ssr/Layout.vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

export function createPageApp(pageContext: PageContext, isSPA: boolean) {
  const { Page: PageComponent, pageProps } = pageContext;

  const createAppFunc = isSPA ? createApp : createSSRApp;

  const AppComponent = {
    render() {
      const renderLayoutSlot = () => h(PageComponent, pageProps || {});
      return h(LayoutComponent, pageProps || {}, { default: renderLayoutSlot });
    },
  };

  const app = createAppFunc(AppComponent);
  app.provide('pageContext', pageContext);
  app.use(VueQueryPlugin);

  return app;
}
