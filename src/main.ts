
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';


import 'ant-design-vue/dist/reset.css';


import App from './Shared/layouts/App.vue'
import router from './Shared/router'

import FullCalendar from '@fullcalendar/vue3'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd);
app.component('FullCalendar', FullCalendar)

app.mount('#app')
