<template>
  <main class="editor" id="main-content">
    <header>
      <p class="eyebrow">Draft editor</p>
      <label>Preview
        <select v-model="mode"><option value="desktop">Desktop</option><option value="tablet">Tablet</option><option value="mobile">Mobile</option></select>
      </label>
      <button @click="save" :disabled="saving">Save draft</button>
      <button @click="publish" :disabled="saving">Publish</button>
    </header>
    <section class="editor-layout">
      <aside class="block-palette" aria-label="Add a content block">
        <h2>Blocks</h2>
        <button @click="addBlock('text')">Text</button>
        <button @click="addBlock('image')">Image</button>
        <button @click="addBlock('gallery')">Gallery</button>
        <button @click="addBlock('spacer')">Spacer</button>
        <section v-if="revisions.length" class="revision-panel">
          <h2>History</h2>
          <ol><li v-for="revision in revisions" :key="revision.id"><button @click="rollback(revision.id)" :disabled="saving">Restore #{{ revision.id }}</button></li></ol>
        </section>
      </aside>
      <section class="canvas" :class="mode" aria-label="Draft canvas">
        <article v-for="(block, index) in blocks" :key="block.id" class="editor-block" draggable="true" @dragstart="dragIndex = index" @dragover.prevent @drop="moveBlock(index)">
          <header><span>↕ {{ block.type }}</span><button @click="removeBlock(index)" :aria-label="`Remove ${block.type} block`">Remove</button></header>
          <textarea v-if="block.type === 'text'" v-model="block.content" aria-label="Text content" rows="4" />
          <label v-else-if="block.type === 'image'">Image URL <input v-model="block.src" placeholder="Choose from media library" /></label>
          <BlockRenderer :block="block" editing />
        </article>
      </section>
    </section>
    <p v-if="status" aria-live="polite">{{ status }}</p>
  </main>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BlockRenderer from '../components/BlockRenderer.vue'
import { getDraft, getRevisions, publishDraft, rollbackRevision, saveDraft } from '../lib/api'
import type { BlockType, LayoutBlock, Revision } from '../types/portfolio'

const props = defineProps<{ id: string }>()
const blocks = ref<LayoutBlock[]>([])
const revisions = ref<Revision[]>([])
const mode = ref<'desktop' | 'tablet' | 'mobile'>('desktop')
const saving = ref(false)
const status = ref('')
const dragIndex = ref<number | null>(null)

async function refreshHistory() { revisions.value = await getRevisions(props.id) }
onMounted(async () => {
  try { [blocks.value] = await Promise.all([getDraft(props.id).then((draft) => draft.blocks), refreshHistory()]) } catch { status.value = 'Unable to load draft.' }
})
function addBlock(type: BlockType) {
  const block: LayoutBlock = { id: crypto.randomUUID(), type }
  if (type === 'text') block.content = 'New editorial text'
  if (type === 'image') block.alt = ''
  blocks.value.push(block)
}
function removeBlock(index: number) { blocks.value.splice(index, 1) }
function moveBlock(targetIndex: number) {
  if (dragIndex.value === null || dragIndex.value === targetIndex) return
  const [block] = blocks.value.splice(dragIndex.value, 1)
  blocks.value.splice(targetIndex, 0, block)
  dragIndex.value = null
}
async function save() { saving.value = true; try { await saveDraft(props.id, blocks.value); status.value = 'Draft saved.' } catch { status.value = 'Unable to save draft.' } finally { saving.value = false } }
async function publish() { saving.value = true; try { await publishDraft(props.id); await refreshHistory(); status.value = 'Draft published.' } catch { status.value = 'Unable to publish draft.' } finally { saving.value = false } }
async function rollback(revisionId: number) { saving.value = true; try { await rollbackRevision(props.id, revisionId); await refreshHistory(); status.value = 'Revision restored.' } catch { status.value = 'Unable to restore revision.' } finally { saving.value = false } }
</script>
