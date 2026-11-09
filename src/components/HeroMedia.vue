<template>
  <div class="hero-media" :class="{ 'hero-media--empty': !clips.length }" data-hero-media>
    <template v-if="clips.length > 1">
      <video
        v-for="slot in [0, 1]"
        :key="slot"
        class="hero-media__clip"
        :class="{ 'is-on': visible === slot }"
        :src="clips[clip[slot]]?.src"
        :poster="clips[clip[slot]]?.poster"
        :aria-label="clips[clip[slot]]?.alt || 'Background video'"
        :autoplay="slot === 0"
        muted
        playsinline
        preload="auto"
        @ended="advance(slot)"
      />
    </template>
    <video
      v-else-if="clips[0]"
      :src="clips[0].src"
      :poster="clips[0].poster"
      :aria-label="clips[0].alt || 'Background video'"
      autoplay
      muted
      playsinline
      @ended="restartSingle"
    />
    <img v-else-if="block?.src" :src="block.src" :alt="block.alt || ''" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import type { LayoutBlock } from '../types/portfolio'

const props = defineProps<{ block?: LayoutBlock; playlist?: LayoutBlock[] }>()
const clips = computed(() => {
  const list = props.playlist?.filter(item => item.type === 'video' && item.src) ?? []
  if (list.length) return list
  return props.block?.type === 'video' && props.block.src ? [props.block] : []
})
const visible = ref(0)
const clip = reactive([0, 1])

function restartSingle(event: Event) {
  const el = event.target as HTMLVideoElement
  el.currentTime = 0
  void el.play()?.catch(() => undefined)
}

async function advance(from: number) {
  if (from !== visible.value || clips.value.length < 2) return
  const to = from === 0 ? 1 : 0
  clip[to] = (clip[from]! + 1) % clips.value.length
  await nextTick()
  const next = document.querySelectorAll<HTMLVideoElement>('.hero-media__clip')[to]
  void next?.play()?.catch(() => undefined)
  visible.value = to
}
</script>
