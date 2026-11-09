import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import Collection from './pages/Collection.vue'
import Project from './pages/Project.vue'
import Holding from './pages/Holding.vue'
import About from './pages/About.vue'
import Contact from './pages/Contact.vue'
import '@fontsource/lexend/500.css'
import './style.css'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/branding', component: Collection, props: { category: 'Branding' } },
    { path: '/entertainment', component: Collection, props: { category: 'Entertainment Concept' } },
    { path: '/projects', component: Collection, props: { category: 'All projects' } },
    { path: '/project/:slug', component: Project },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    ...['graphic-design'].map(path => ({ path: `/${path}`, component: Holding })),
    { path: '/:pathMatch(.*)*', component: Holding },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
router.afterEach(async () => {
  await new Promise(resolve => setTimeout(resolve, 0))
  document.title = `${document.querySelector('h1')?.textContent || 'Jade L.'} — d.archivol`
  document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true })
})
createApp(App).use(router).mount('#app')
