<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { media, assets } from '../media'
const route = useRoute()
const title = computed(() => ({ '/graphic-design': 'Graphic Design', '/about': 'About Me', '/awards': 'Awards', '/blogs': 'Blogs' }[route.path] || 'Page not found'))
</script>
<template><main id="main" tabindex="-1" class="page"><h1 class="holding-title">{{ title }}</h1><div class="holding"><img :src="media(assets.logo[0]!)" alt=""><h2>Stay tuned.</h2></div><RouterLink to="/projects" class="browse">Browse all projects ↗</RouterLink></main></template>
