<template>
  <main id="main-content" class="home">
    <HeroMedia :block="heroBlock" :playlist="heroPlaylist" />
    <div class="home__veil" aria-hidden="true" />
    <div class="home__content">
      <div class="home__categories" aria-label="Project categories">
        <RouterLink to="/branding">Branding</RouterLink>
        <RouterLink to="/graphic-design">Graphic Design</RouterLink>
        <RouterLink to="/entertainment">Entertainment Concept</RouterLink>
      </div>
      <div class="home__contact">
        <p>Jade L. <a href="https://www.instagram.com/d.archivol/" target="_blank" rel="noreferrer">@d.archivol</a></p>
        <a href="mailto:lxmngch.studio@gmail.com">lxmngch.studio@gmail.com</a>
      </div>
    </div>
    <p v-if="error" class="home__error" role="alert">The latest work is unavailable right now.</p>
    <section v-if="remainingBlocks.length || projects.length" class="home__after" aria-label="Featured projects">
      <BlockRenderer v-for="block in remainingBlocks" :key="block.id" :block="block" />
      <RouterLink v-for="project in projects" :key="project.slug" :to="`/projects/${project.slug}`" class="home-project">
        <img v-if="project.cover_image" :src="project.cover_image" :alt="`${project.title} cover`" />
        <span>{{ project.title }}</span>
      </RouterLink>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BlockRenderer from '../components/BlockRenderer.vue'
import HeroMedia from '../components/HeroMedia.vue'
import { getProjects, getSitePage } from '../lib/api'
import type { ProjectSummary, SitePage } from '../types/portfolio'

const page = ref<SitePage | null>(null)
const projects = ref<ProjectSummary[]>([])
const error = ref(false)
const heroPlaylist = computed(() => page.value?.blocks.filter(block => (block.type === 'image' || block.type === 'video') && block.src) ?? [])
const heroBlock = computed(() => heroPlaylist.value[0])
const remainingBlocks = computed(() => page.value?.blocks.filter(block => !heroPlaylist.value.includes(block)) ?? [])

onMounted(async () => {
  try { [page.value, projects.value] = await Promise.all([getSitePage('home'), getProjects()]) } catch { error.value = true }
})
</script>
