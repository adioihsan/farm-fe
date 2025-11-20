import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast, { type PluginOptions,POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)
const pinia = createPinia()
const toastOption: PluginOptions = {
    draggable: true,
    position:POSITION.TOP_CENTER
}
app.use(router)
app.use(pinia)
app.use(Toast, toastOption)
app.mount("#app")
