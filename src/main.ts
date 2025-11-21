import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast, { type PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { onSessionExpired } from './lib/fetcher'
import { useAuthStore } from './stores/auth.store'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)
const pinia = createPinia()
const toastOption: PluginOptions = {
    draggable: true,
    position: POSITION.TOP_CENTER
}
onSessionExpired(() => {
    const auth = useAuthStore();
    auth.logout();    // clear user state
    router.push("/auth/login");
})
app.use(router)
app.use(pinia)
app.use(Toast, toastOption)
app.use(VueApexCharts);
app.mount("#app")
