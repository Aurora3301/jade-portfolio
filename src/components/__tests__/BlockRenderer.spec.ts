import { mount } from '@vue/test-utils'
import BlockRenderer from '../BlockRenderer.vue'

describe('BlockRenderer', () => {
  it('renders text content as an editorial text block', () => {
    const wrapper = mount(BlockRenderer, { props: { block: { id: 'intro', type: 'text', content: 'A studio story' } } })
    expect(wrapper.get('[data-block="text"]').text()).toContain('A studio story')
  })

  it('requires descriptive alternative text for editable image blocks', () => {
    const wrapper = mount(BlockRenderer, { props: { editing: true, block: { id: 'hero', type: 'image', src: '/hero.jpg', alt: '' } } })
    expect(wrapper.text()).toContain('Add alt text')
  })
})
