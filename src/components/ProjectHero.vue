<template>
  <section class="project-hero" data-project-hero>
    <div class="project-hero__intro">
      <h1>{{ title }}</h1>
      <p v-if="intro" class="project-hero__summary">{{ intro }}</p>
    </div>
    <aside class="project-hero__context" aria-label="Project context">
      <p>{{ context }}</p>
    </aside>
    <div class="project-hero__media">
      <video v-if="leadBlock?.type === 'video' && leadBlock.src" :src="leadBlock.src" :poster="leadBlock.poster" :aria-label="leadBlock.alt || `${title} lead video`" controls playsinline preload="metadata" />
      <img v-else-if="leadBlock?.src" :src="leadBlock.src" :alt="leadBlock.alt || ''" />
      <p v-else data-project-fallback>Selected work</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { LayoutBlock } from '../types/portfolio'

withDefaults(defineProps<{ title: string; intro?: string; leadBlock?: LayoutBlock; context?: string }>(), {
  context: 'Selected work',
})
</script>
