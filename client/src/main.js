import { createApp } from 'vue';
import 'bootswatch/dist/zephyr/bootstrap.css';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
