import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue'
import router from './router'

import '@/assets/style/base.less';
// import './assets/main.css'

const app = createApp(App)

app.use(Antd)
app.use(createPinia())
app.use(router)

app.mount('#app')
