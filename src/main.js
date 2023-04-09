import { createApp } from 'vue';
// 匯入 vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// 匯入 qs
import qs from 'qs';

import App from './App.vue';
import router from './router';

const app = createApp(App);
// 註冊 vue-axios
app.use(VueAxios, axios);
// 全域註冊 qs
app.config.globalProperties.$qs = qs;

app.use(router);
app.mount('#app');
