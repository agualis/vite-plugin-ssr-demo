export type PageContext = {
  pageProps: Record<string, unknown>,
  is404: boolean,
  //TODO: use correct type
  routeParams: any,
};
