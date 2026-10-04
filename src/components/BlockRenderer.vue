<template>
  <section v-if="block.type === 'text' && block.title" data-block="text" class="block-copy">
    <h2>{{ block.title }}</h2>
    <p v-if="block.content" class="block-text">{{ block.content }}</p>
  </section>
  <p v-else-if="block.type === 'text'" data-block="text" class="block-text">{{ block.content }}</p>
  <figure v-else-if="block.type === 'image'" data-block="image" class="block-image">
    <img :src="block.src" :alt="block.alt || ''" />
    <figcaption v-if="editing && !block.alt" class="block-warning">Add alt text before publishing.</figcaption>
  </figure>
  <section v-else-if="block.type === 'gallery'" data-block="gallery" class="block-gallery" aria-label="Project gallery">
    <figure v-for="item in block.items" :key="item.src">
      <img :src="item.src" :alt="item.alt" loading="lazy" />
    </figure>
  </section>
  <figure v-else-if="block.type === 'video'" data-block="video" class="block-video">
    <video :src="block.src" :poster="block.poster" :aria-label="block.alt || 'Project video'" controls playsinline preload="none" />
  </figure>
  <a v-else-if="block.type === 'link'" data-block="link" href="#contact">{{ block.content }}</a>
  <div v-else-if="block.type === 'spacer'" data-block="spacer" class="block-spacer" aria-hidden="true" />
  <section v-else data-block="unsupported" class="block-placeholder">{{ block.type }} block</section>
</template>

<script setup lang="ts">
import type { LayoutBlock } from '../types/portfolio'
defineProps<{ block: LayoutBlock; editing?: boolean }>()
</script>

<style scoped>
.block-text { max-width: 55ch; font: clamp(1.1rem, 2vw, 1.7rem)/1.3 Georgia, serif; }
.block-image img { display: block; width: 100%; height: auto; }
.block-warning { color: #a33; font-size: .8rem; }
.block-gallery { display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); gap:1rem; }
.block-gallery figure { margin:0; }
.block-gallery img { display:block; width:100%; height:auto; }
.block-video video { display:block; width:100%; height:auto; }
.block-placeholder { min-height: 8rem; border: 1px solid #111; padding: 1rem; }
.block-spacer { min-height: 5rem; }
</style>
