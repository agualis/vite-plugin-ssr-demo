<script setup lang="ts">
import Link from './Link.vue';

import logoUrl from '@/assets/images/logo-light.svg';

const modeLinks = [
  {
    url: '/ssr',
    name: 'SSR',
  },
  {
    url: '/spa',
    name: 'SPA',
  },
  {
    url: '/characters',
    name: 'Vue-query',
  },
];
</script>

<template>
  <div class="panel">
    <a href="/" class="logo">
      <img class="logo" :src="logoUrl" />
    </a>
    <a href="/">
      <h1>vite-plugin-ssr</h1>
    </a>
    <div class="links">
      <span style="font-weight: normal">Modes:</span>
      <Link v-for="link in modeLinks" :key="link.name" :href="link.url">{{
        link.name
      }}</Link>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.panel {
  width: 100%;
  max-width: 70%;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -4px rgb(0 0 0 / 10%);
  background-color: white;
}

.logo {
  display: grid;
  place-items: center;
  margin-top: 8px;
  margin-bottom: 16px;
}

h1 {
  font-size: 2em;
  text-align: center;
}

.links {
  margin-top: 32px;
  margin-left: -32px;
  margin-right: -32px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-top: 1px solid hsl(0deg 0% 95%);
  border-bottom: 1px solid hsl(0deg 0% 95%);
  text-align: center;
}

.links * {
  position: relative;
  margin-left: 8px;
  margin-right: 8px;
  color: hsl(0deg 0% 50%);
  font-weight: bold;
  font-size: 0.9em;
}

.links a:hover,
.links a.active {
  color: hsl(0deg 0% 20%);
}

.links a.active::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: currentcolor;
}

.content {
  margin-top: 32px;
}

.content *:not(:first-child) {
  margin-top: 16px;
}

.content hr:not(:first-child) {
  height: 1px;
  margin: 32px 0;
  border: none;
  background-color: hsl(0deg 0% 50%);
}

.status {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  margin-left: -32px;
  margin-right: -32px;
  padding: 16px 22px;
  border-top: 1px solid hsl(0deg 0% 95%);
  font-weight: bold;
  font-size: 0.8em;
}

.status .external,
.status .checks {
  flex: 0 0 0;
  display: flex;
}

.status .external a,
.status .checks .check {
  display: flex;
  align-items: center;
  margin: 0 10px;
}

.status .external a .text {
  text-decoration: underline;
}

.status .external a img {
  display: block;
  width: 16px;
  margin-left: 4px;
}

.status .checks .check img {
  display: block;
  width: 16px;
  margin-left: 4px;
  filter: invert(1) brightness(0.5) sepia(1) hue-rotate(90deg);
}

@media screen and (max-width: 425px) {
  .status {
    padding-right: 16px;
  }

  .status .checks {
    margin: -3px 0;
    padding: 3px 4px;
    border-radius: 16px;
    box-shadow: 0 0 3px hsl(0deg 0% 75%);
  }

  .status .checks .check,
  .status .checks .check img {
    margin: 0;
  }

  .status .checks .check .text {
    display: none;
  }
}

@media screen and (max-width: 425px) {
  .panel {
    padding: 24px;
    border-radius: 0;
  }

  h1 {
    font-size: 1.5em;
  }

  .links,
  .status {
    margin-left: -24px;
    margin-right: -24px;
  }

  .links,
  .content {
    margin-top: 24px;
  }

  .status {
    margin-bottom: -24px;
    padding-left: 14px;
  }
}
</style>
