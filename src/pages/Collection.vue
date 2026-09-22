<script setup lang="ts">
import { computed } from 'vue'
import { projects, coverFor } from '../projects'
import { media, assets } from '../media'
const props = defineProps<{ category: string }>()
const selected = computed(() => props.category === 'All projects' ? projects : projects.filter(p => p.category === props.category))
const printProjects = () => window.print()
</script>
<template>
  <main id="main" tabindex="-1" class="collection page">
    <div class="collection-heading"><h1>{{ category }}</h1><button class="text-link print-link" @click="printProjects" title="Print this collection or save it as a PDF">download selected projects</button></div>
    <nav v-if="category === 'All projects'" class="category-links" aria-label="Categories"><RouterLink to="/branding">Branding</RouterLink><RouterLink to="/entertainment">Entertainment Concept</RouterLink></nav>
    <div class="project-grid">
      <RouterLink v-for="p in selected" :key="p.slug" :to="`/project/${p.slug}`" class="project-card">
        <div class="card-image" :class="{ pending: p.pending }"><img v-if="!p.pending" :src="media(coverFor(p)!)" :alt="`${p.title} project preview`"><template v-else><img :src="media(assets.logo[0]!)" alt=""><span>Stay tuned.</span></template></div>
        <h2>{{ p.title }}</h2><p v-if="p.pending" class="card-subtitle">My 22nd Birthday Dinner</p>
      </RouterLink>
    </div>
    <RouterLink v-if="category !== 'All projects'" class="browse" to="/projects">Browse more projects / all projects <span aria-hidden="true">↗</span></RouterLink>
    <RouterLink v-else class="browse" to="/">Back to home <span aria-hidden="true">↗</span></RouterLink>
  </main>
</template>
