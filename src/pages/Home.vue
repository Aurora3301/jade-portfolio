<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from 'vue'
import { assets, media } from '../media'
const clips = assets.landing!
const visible = ref(0)
const clip = reactive([0, Math.min(1, Math.max(clips.length - 1, 0))])
const layer = [ref<HTMLVideoElement | null>(null), ref<HTMLVideoElement | null>(null)]
const swapping = ref(false)

const playReady = (el: HTMLVideoElement) => new Promise<void>((resolve, reject) => {
  const start = () => { el.play().then(() => resolve()).catch(reject) }
  if (el.readyState >= 2) start()
  else {
    el.addEventListener('canplay', start, { once: true })
    el.addEventListener('error', () => reject(new Error('video')), { once: true })
  }
})

const advance = async (from: number) => {
  if (swapping.value || clips.length < 2) return
  swapping.value = true
  const to = from === 0 ? 1 : 0
  clip[to] = (clip[from]! + 1) % clips.length
  await nextTick()
  const el = layer[to]!.value
  try {
    if (el) await playReady(el)
    visible.value = to
  } catch {
    visible.value = to
  }
  window.setTimeout(() => { swapping.value = false }, 950)
}

onMounted(() => { layer[0]!.value?.play().catch(() => {}) })
</script>
<template>
  <main id="main" tabindex="-1" class="home" :style="{ backgroundImage: `url(${media('home-poster.webp')})` }">
    <video
      v-for="slot in [0, 1]"
      :key="slot"
      :ref="el => { layer[slot]!.value = (el as HTMLVideoElement | null) }"
      class="home-video"
      :class="{ 'is-on': visible === slot }"
      :src="media(clips[clip[slot]]!)"
      :autoplay="slot === 0"
      muted
      playsinline
      preload="auto"
      aria-hidden="true"
      @ended="advance(slot)"
      @error="advance(slot)"
    />
    <div class="home-shade"></div>
    <RouterLink class="home-logo" to="/about" aria-label="About Jade"><img :src="media(assets.logo[0]!)" alt=""></RouterLink>
    <h1 class="sr-only">Jade L. — design portfolio</h1>
    <nav class="home-categories" aria-label="Project categories"><RouterLink to="/branding">Branding</RouterLink><RouterLink to="/graphic-design">Graphic Design</RouterLink><RouterLink to="/entertainment">Entertainment Concept</RouterLink></nav>
    <div class="home-contact"><p>Jade L. @d.archivol</p><a href="mailto:lxmngch.studio@gmail.com">lxmngch.studio@gmail.com</a></div>
  </main>
</template>
