<template>
  <main id="main-content" class="collection">
    <div class="collection-heading">
      <h1>{{ category }}</h1>
      <button class="collection-download" type="button" title="Print this collection or save it as a PDF" @click="printProjects">download selected projects</button>
    </div>
    <RouterLink v-if="category === 'All projects'" class="collection-category" to="/branding">Branding</RouterLink>
    <p v-if="error" role="alert">Projects are unavailable right now.</p>
    <p v-else-if="loading">Loading projects…</p>
    <section v-else class="collection-grid" :aria-label="`${category} projects`">
      <RouterLink v-for="project in selectedProjects" :key="project.slug" :to="`/projects/${project.slug}`" class="collection-card">
        <div class="collection-card-image" :class="{ 'collection-card-image--pending': project.pending }">
          <template v-if="project.pending">
            <img class="collection-pending-logo" :src="mediaUrl('logo-0.webp')" alt="" />
            <strong>Stay tuned.</strong>
          </template>
          <img v-else-if="project.cover_image" :src="project.cover_image" :alt="`${project.title} cover`" />
          <span v-else>Stay tuned.</span>
        </div>
        <h2>{{ project.title }}</h2>
        <p v-if="project.subtitle" class="collection-card-subtitle">{{ project.subtitle }}</p>
      </RouterLink>
    </section>
    <RouterLink v-if="category !== 'All projects'" class="collection-browse" to="/projects">Browse more projects / all projects <span aria-hidden="true">↗</span></RouterLink>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getProjects } from '../lib/api'
import type { ProjectSummary } from '../types/portfolio'
import { projects as publishedProjects } from '../lib/publishedProjects'
import { mediaUrl } from '../lib/publishedContent'

const props = withDefaults(defineProps<{ category?: string }>(), { category: 'All projects' })
const printProjects = () => window.print()

const projects = ref<ProjectSummary[]>([])
const selectedProjects = computed(() => props.category === 'All projects' ? projects.value : projects.value.filter(project =>
  (project.category ?? publishedProjects.find(item => item.slug === project.slug)?.category) === props.category,
))
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try { projects.value = await getProjects() } catch { error.value = true } finally { loading.value = false }
})
</script>
