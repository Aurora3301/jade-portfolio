<template>
  <main v-if="project" id="main-content" class="story">
    <ProjectHero v-if="!project.pending" :title="project.title" :intro="introBlock?.content" :lead-block="leadBlock" :context="project.context || 'Selected work'" />
    <section v-else><h1>{{ project.title }}</h1><p>{{ introBlock?.content }}</p><h2>Stay tuned.</h2></section>
    <section v-if="overviewBlocks.length" class="story__overview" aria-label="Project overview">
      <BlockRenderer v-for="block in overviewBlocks" :key="block.id" :block="block" />
    </section>
    <section v-if="remainingBlocks.length" class="story__content" aria-label="Project story">
      <BlockRenderer v-for="block in remainingBlocks" :key="block.id" :block="block" />
    </section>
  </main>
  <p v-else-if="error" role="alert">Project unavailable.</p>
  <p v-else>Loading project…</p>
</template>
<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { getProject } from '../lib/api'
import BlockRenderer from '../components/BlockRenderer.vue'
import ProjectHero from '../components/ProjectHero.vue'
import type { Project } from '../types/portfolio'
const props = defineProps<{ slug: string }>()
const project = ref<Project | null>(null); const error = ref(false)
const leadBlock = computed(() => project.value?.blocks.find((block) => block.type === 'image' || block.type === 'video'))
const introBlock = computed(() => project.value?.blocks.find((block) => block.type === 'text'))
const storyBlocks = computed(() => project.value?.blocks.filter((block) => block.id !== leadBlock.value?.id && block.id !== introBlock.value?.id) ?? [])
const overviewBlocks = computed(() => {
  const firstMedia = storyBlocks.value.findIndex(block => block.type !== 'text')
  return storyBlocks.value.slice(0, firstMedia === -1 ? storyBlocks.value.length : firstMedia)
})
const remainingBlocks = computed(() => storyBlocks.value.slice(overviewBlocks.value.length))
watch(() => props.slug, async slug => {
  project.value = null
  error.value = false
  try { const result = await getProject(slug); if (props.slug === slug) project.value = result }
  catch { if (props.slug === slug) error.value = true }
}, { immediate: true })
</script>
