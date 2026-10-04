<template>
  <div class="hero-media" :class="{ 'hero-media--empty': !active?.src }" data-hero-media>
    <video
      v-if="active?.type === 'video' && active.src"
      :key="active.src"
      ref="media"
      :src="active.src"
      :poster="active.poster"
      :aria-label="active.alt || 'Background video'"
      autoplay
      muted
      playsinline
      @ended="advanceVideo"
    />
    <img v-else-if="active?.src" :src="active.src" :alt="active.alt || ''" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LayoutBlock } from '../types/portfolio'

const props = defineProps<{ block?: LayoutBlock; playlist?: LayoutBlock[] }>()

const media = ref<HTMLVideoElement | null>(null)
const index = ref(0)
const active = computed(() => props.playlist?.[index.value] ?? props.block)
function advanceVideo() {
  if ((props.playlist?.length ?? 0) > 1) {
    index.value = (index.value + 1) % props.playlist!.length
  } else if (media.value) {
    media.value.currentTime = 0
    void media.value.play()?.catch(() => undefined)
  }
}
</script>
