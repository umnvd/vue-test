import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import cancelRequestsPlugin from './stores/plugins/cancelRequests';

const pinia = createPinia();
pinia.use(cancelRequestsPlugin);

createApp(App).use(router).use(pinia).mount('#app');
