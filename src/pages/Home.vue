<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { assets, media } from '../media'
const index = ref(0)
const paused = ref(false)
const video = ref<HTMLVideoElement>()
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
paused.value = reduced.matches
let timer: ReturnType<typeof setInterval>
const changeMotion = () => { paused.value = reduced.matches }
watch(paused, async value => { await nextTick(); if (value) video.value?.pause(); else video.value?.play().catch(() => { paused.value = true }) })
onMounted(() => {
  timer = setInterval(() => { if (!paused.value) index.value = (index.value + 1) % assets.landing!.length }, 12000)
  reduced.addEventListener('change', changeMotion)
})
onUnmounted(() => { clearInterval(timer); reduced.removeEventListener('change', changeMotion) })
</script>
<template>
  <main id="main" tabindex="-1" class="home" :style="{ backgroundImage: `url(${media('home-poster.webp')})` }">
    <video :key="index" ref="video" class="home-video" :src="media(assets.landing[index]!)" :poster="media('home-poster.webp')" :autoplay="!paused" muted loop playsinline aria-hidden="true" @error="paused = true" @play="paused && video?.pause()" />
    <div class="home-shade"></div>
    <RouterLink class="home-logo" to="/about" aria-label="About Jade"><img :src="media(assets.logo[0]!)" alt=""></RouterLink>
    <h1 class="sr-only">Jade L. — design portfolio</h1>
    <nav class="home-categories" aria-label="Project categories"><RouterLink to="/branding">Branding</RouterLink><RouterLink to="/graphic-design">Graphic Design</RouterLink><RouterLink to="/entertainment">Entertainment Concept</RouterLink></nav>
    <div class="home-contact"><p>Jade L. @d.archivol</p><a href="mailto:lxmngch.studio@gmail.com">lxmngch.studio@gmail.com</a></div>
    <button class="motion-button" @click="paused = !paused">{{ paused ? 'Play background' : 'Pause background' }}</button>
  </main>
</template>
