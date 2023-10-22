
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';


import 'ant-design-vue/dist/reset.css';

import App from './Shared/layouts/App.vue'
const app = createApp(App)

import router from './Shared/router'

import FullCalendar from '@fullcalendar/vue3'
app.component('FullCalendar', FullCalendar)

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
app.component('QuillEditor', QuillEditor)

app.use(createPinia())
app.use(router)
app.use(Antd);

app.mount('#app')
