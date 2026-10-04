import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import HeroMedia from '../HeroMedia.vue'

describe('HeroMedia', () => {
  it('autoplays silently without a playback button or individual video loop', () => {
    const wrapper = mount(HeroMedia, {
      props: { block: { id: 'hero', type: 'video', src: '/hero.mp4', alt: 'Dinner table' } },
    })

    expect(wrapper.get('video').attributes('src')).toBe('/hero.mp4')
    expect(wrapper.get('video').element.autoplay).toBe(true)
    expect(wrapper.get('video').element.muted).toBe(true)
    expect(wrapper.get('video').element.loop).toBe(false)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('advances only when a clip ends and repeats the playlist after the last clip', async () => {
    vi.useFakeTimers()
    const playlist = ['first', 'second', 'third'].map(id => ({ id, type: 'video' as const, src: `/${id}.mp4` }))
    const wrapper = mount(HeroMedia, { props: { playlist } })
    try {
      await vi.advanceTimersByTimeAsync(24000)
      expect(wrapper.get('video').attributes('src')).toBe('/first.mp4')
      for (const expected of ['second', 'third', 'first']) {
        await wrapper.get('video').trigger('ended')
        expect(wrapper.get('video').attributes('src')).toBe(`/${expected}.mp4`)
      }
    } finally { wrapper.unmount(); vi.useRealTimers() }
  })

  it('renders an image background without a playback control', () => {
    const wrapper = mount(HeroMedia, {
      props: { block: { id: 'hero', type: 'image', src: '/hero.jpg', alt: 'Dinner table' } },
    })

    expect(wrapper.get('img').attributes('src')).toBe('/hero.jpg')
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
