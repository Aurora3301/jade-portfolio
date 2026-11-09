import { mount } from '@vue/test-utils'
import BrandMark from '../BrandMark.vue'

describe('BrandMark', () => {
  it('links the brand mark back to the landing page', () => {
    const wrapper = mount(BrandMark, {
      global: { stubs: { RouterLink: { template: '<a :href="to"><slot /></a>', props: ['to'] } } },
    })

    expect(wrapper.get('a').attributes('href')).toBe('https://aurora3301.github.io/jade-portfolio/#/')
    expect(wrapper.get('img').attributes('src')).toContain('logo-0.webp')
  })
})
