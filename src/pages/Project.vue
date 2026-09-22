<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects, imagesFor, videosFor, coverFor } from '../projects'
import { media, assets } from '../media'
const route = useRoute()
const project = computed(() => projects.find(p => p.slug === route.params.slug))
const gallery = computed(() => project.value ? imagesFor(project.value).filter(x => x !== coverFor(project.value!)) : [])
</script>
<template>
  <main v-if="project" id="main" tabindex="-1" class="project page">
    <div class="project-heading"><div><h1>{{ project.title }}</h1><p class="hook">{{ project.hook }}</p></div><div class="project-meta"><p>{{ project.meta }}</p><p>{{ project.credit }}</p></div></div>
    <div v-if="project.pending" class="holding"><img :src="media(assets.logo[0]!)" alt=""><h2>Stay tuned.</h2></div>
    <template v-else>
      <img class="project-hero" :src="media(coverFor(project)!)" :alt="`${project.title} — main project visual`">
      <div class="story-grid"><section v-for="section in project.sections" :key="section.title"><h2>{{ section.title }}</h2><p>{{ section.text }}</p></section></div>
      <div class="project-videos"><video v-for="(file, i) in videosFor(project)" :key="file" controls playsinline preload="none" :poster="media(coverFor(project)!)" :aria-label="`${project.title} film ${i + 1}`"><source :src="media(file)" type="video/mp4">Your browser cannot play this video.</video></div>
      <div class="gallery"><img v-for="(file, i) in gallery.slice(0, 2)" :key="file" :src="media(file)" :alt="`${project.title} — design study ${i + 1}`" loading="lazy"></div>
      <div class="project-details"><template v-for="detail in project.details" :key="detail.title"><details v-if="detail.disclosure"><summary>{{ detail.title }}</summary><p>{{ detail.text }}</p></details><section v-else><h2>{{ detail.title }}</h2><p v-if="detail.text">{{ detail.text }}</p></section></template></div>
      <div class="gallery"><img v-for="(file, i) in gallery.slice(2)" :key="file" :src="media(file)" :alt="`${project.title} — design study ${i + 3}`" loading="lazy"></div>
    </template>
    <RouterLink class="browse" to="/projects">Browse more projects / all projects ↗</RouterLink>
  </main>
  <main v-else id="main" tabindex="-1" class="page holding"><h1>Project not found.</h1><RouterLink to="/projects">View all projects</RouterLink></main>
</template>
