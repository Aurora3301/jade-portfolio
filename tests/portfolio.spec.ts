import { test, expect } from '@playwright/test'

test('landing advances clips without a playback button', async ({ page }) => {
  await page.goto('./#/')
  const video = page.locator('.hero-media video')
  await expect(video).toHaveAttribute('src', /landing-0/)
  await expect(video).not.toHaveAttribute('loop')
  await expect(page.getByRole('button', { name: /background/i })).toHaveCount(0)
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.muted && !el.paused && el.currentTime > 0)).toBe(true)
  await expect(video).toHaveAttribute('src', /landing-1/, { timeout: 20000 })
  await expect(page.locator('.brand-mark')).toHaveAttribute('href', 'https://aurora3301.github.io/jade-portfolio/#/')
})

test('branding collection and transparent editorial layout', async ({ page }, testInfo) => {
  await page.goto('./#/branding')
  await expect(page.getByRole('heading', { name: 'Branding', exact: true })).toBeVisible()
  await expect(page.locator('.collection-card')).toHaveCount(3)
  await expect.poll(() => page.locator('.collection-card-image img').evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true)
  if (testInfo.project.name === 'desktop') {
    const gaps = await page.locator('.collection-card').evaluateAll(cards => {
      const b = cards.map(card => card.getBoundingClientRect())
      return [b[0].left, b[1].left-b[0].right, b[2].left-b[1].right, innerWidth-b[2].right]
    })
    expect(Math.max(...gaps)-Math.min(...gaps)).toBeLessThan(1)
  }
  await page.locator('.collection-card').first().click()
  await expect(page.getByRole('heading', { name: 'eggy', exact: true })).toBeVisible()
  await expect(page.locator('.project-hero__summary')).toHaveCSS('color', 'rgb(80, 49, 36)')
  await expect(page.locator('.project-hero__media')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await expect(page.locator('.project-hero__media img')).toHaveCSS('object-fit', 'contain')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.goto('./#/project/gutter')
  await page.reload()
  await expect(page.getByRole('heading', { name: 'gutter', exact: true })).toBeVisible()
  await expect(page.locator('main video')).toHaveCount(3)
})

test('pending card, holding pages and contact work without backend', async ({ page }) => {
  await page.goto('./#/projects')
  await expect(page.locator('.collection-card')).toHaveCount(6)
  const pending = page.locator('.collection-card').filter({ hasText: 'From the Ground' })
  await expect(pending.locator('strong')).toHaveText('Stay tuned.')
  await expect(pending.locator('img')).toHaveCount(1)
  await expect(pending.locator('.collection-card-subtitle')).toHaveText('My 22nd Birthday Dinner')
  await expect(pending.locator('.collection-card-image')).toHaveCSS('background-color', 'rgb(229, 174, 174)')
  await pending.click()
  await expect(page.getByRole('heading', { name: 'Stay tuned.' })).toBeVisible()
  for (const route of ['graphic-design', 'awards', 'blogs']) {
    await page.goto('./#/' + route)
    await expect(page.getByText('Stay tuned.', { exact: true })).toBeVisible()
  }
  await page.goto('./#/contact')
  await expect(page.getByRole('link', { name: 'lxmngch.studio@gmail.com', exact: true })).toHaveAttribute('href', 'mailto:lxmngch.studio@gmail.com')
  await expect(page.locator('form')).toHaveCount(0)
})
