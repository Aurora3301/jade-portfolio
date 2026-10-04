<template>
  <main id="main-content" class="page-story">
    <h1>{{ title }}</h1>
    <div class="release-holding">
      <img :src="mediaUrl('logo-0.webp')" alt="" />
      <h2>Stay tuned.</h2>
    </div>
    <RouterLink to="/projects">Browse all projects ↗</RouterLink>
  </main>
</template>
<script setup lang="ts">
import { mediaUrl } from '../lib/publishedContent'
defineProps<{ title: string }>()
</script>
<style scoped>
.release-holding { display: grid; justify-items: center; gap: 24px; padding: 70px 0; }
.release-holding img { width: 140px; mask-image: radial-gradient(circle, #000 59%, transparent 71%); }
.release-holding h2 { color: #e5aeae; font-size: clamp(40px, 5vw, 80px); margin: 0; }
</style>
