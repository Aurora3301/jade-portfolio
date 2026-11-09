import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import ContactView from './views/ContactView.vue'
import NotFoundView from './views/NotFoundView.vue'
import ProjectsView from './views/ProjectsView.vue'
import ProjectView from './views/ProjectView.vue'
import HoldingView from './views/HoldingView.vue'

export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', component: HomeView },
    { path: '/projects', component: ProjectsView },
    { path: '/branding', component: ProjectsView, props: { category: 'Branding' } },
    { path: '/entertainment', component: ProjectsView, props: { category: 'Entertainment Concept' } },
    { path: '/projects/:slug', alias: '/project/:slug', component: ProjectView, props: true },
    { path: '/graphic-design', component: HoldingView, props: { title: 'Graphic Design' } },
    { path: '/awards', component: HoldingView, props: { title: 'Awards' } },
    { path: '/blogs', component: HoldingView, props: { title: 'Blogs' } },
    { path: '/about', component: AboutView },
    { path: '/contact', component: ContactView },
    { path: '/:pathMatch(.*)*', component: NotFoundView },
  ],
})
