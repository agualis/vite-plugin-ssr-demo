// <script lang="ts" setup>
// const title = 'SSR';
// TODO: script exporting title is causing export default error when running build
//
</script>

<template>
  <p>
    This page is rendered on the <b>server-side</b>, then rendered
    <i>again</i> on the <b>client-side</b> during
    <a href="https://vite-plugin-ssr.com/hydration">hydration</a>. This
    technique is the default behavior for
    <InlineCode>vite-plugin-ssr</InlineCode>, commonly referred to as
    <a href="https://vite-plugin-ssr.com/render-modes#ssr"
      ><b>server-side rendering</b> (SSR)</a
    >.
  </p>
  <Counter />
</template>
