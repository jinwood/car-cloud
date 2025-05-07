import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'

const app = createApp(App)
const pinia = createPinia()
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})

app.use(pinia)
app.use(router)

app.mount('#app')
