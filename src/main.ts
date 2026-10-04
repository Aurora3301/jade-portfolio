import { createApp } from 'vue'; import { createPinia } from 'pinia'; import { PiniaColada } from '@pinia/colada'; import App from './App.vue'; import router from './router'; import './style.css'
createApp(App).use(createPinia()).use(PiniaColada, {}).use(router).mount('#app')
