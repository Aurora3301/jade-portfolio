<template>
  <main id="main-content" class="page-story">
    <p class="eyebrow">About me</p>
    <h1 v-if="page">{{ page.title }}</h1>
    <h1 v-else>Studio information.</h1>
    <p v-if="error" role="alert">Studio information is unavailable right now.</p>
    <BlockRenderer v-for="block in page?.blocks" :key="block.id" :block="block" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BlockRenderer from '../components/BlockRenderer.vue'
import { getSitePage } from '../lib/api'
import type { SitePage } from '../types/portfolio'

const page = ref<SitePage | null>(null)
const error = ref(false)
onMounted(async () => { try { page.value = await getSitePage('about') } catch { error.value = true } })
</script>
