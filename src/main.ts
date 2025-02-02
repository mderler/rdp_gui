import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.scss'
import './scss/custom.scss'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from '@/App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
