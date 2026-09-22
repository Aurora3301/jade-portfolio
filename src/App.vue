<script setup lang="ts">
import { useRoute } from 'vue-router'
import { media, assets } from './media'
const route = useRoute()
</script>
<template>
  <a class="skip" href="#main">Skip to content</a>
  <header v-if="route.path !== '/'" class="site-header">
    <RouterLink to="/" class="brand" aria-label="d.archivol — home"><img :src="media(assets.logo[0]!)" alt=""><span>d.archivol</span></RouterLink>
    <nav aria-label="Main navigation"><RouterLink to="/about">about me</RouterLink><RouterLink to="/awards">awards</RouterLink><RouterLink to="/blogs">blogs</RouterLink><a href="mailto:lxmngch.studio@gmail.com">contact</a></nav>
  </header>
  <RouterView />
</template>
