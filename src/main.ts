import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import {router}  from "./route/index"
// import moment from "moment"
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn');  

// Vue.prototype.$moment = moment;


const app = createApp(App);
app.use(router);

// app.config.globalProperties.$moment = moment;

app.mount('#app')
