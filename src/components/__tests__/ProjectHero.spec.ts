import { mount } from '@vue/test-utils'
import ProjectHero from '../ProjectHero.vue'

describe('ProjectHero', () => {
  it('keeps the editorial lead panel when a project has no media', () => {
    const wrapper = mount(ProjectHero, { props: { title: 'Gutter' } })

    expect(wrapper.get('[data-project-hero]').text()).toContain('Gutter')
    expect(wrapper.get('[data-project-fallback]').text()).toContain('Selected work')
  })
})
