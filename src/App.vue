<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header" :class="{ 'site-header--home': isHome, 'site-header--branding': isBranding }">
    <div class="site-header__brand">
      <BrandMark />
      <RouterLink to="/" class="brand">d.archivol</RouterLink>
    </div>
    <nav v-if="isBranding" aria-label="Primary">
      <RouterLink to="/about">about me</RouterLink>
      <a href="https://aurora3301.github.io/jade-portfolio/#/awards">awards</a>
      <a href="https://aurora3301.github.io/jade-portfolio/#/blogs">blogs</a>
      <a href="mailto:lxmngch.studio@gmail.com">contact</a>
    </nav>
    <nav v-else aria-label="Primary">
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/projects">Projects</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BrandMark from './components/BrandMark.vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')
const isBranding = computed(() => route.path === '/branding')
</script>
