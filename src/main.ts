// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 样式
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/assets/iconfont.js'
import 'animate.css'

// wow.js
import WOW from 'wow.js'

import SvgIcon from './components/SvgIcon.vue'

// 创建应用
const app = createApp(App)
app.use(router)
app.component('SvgIcon', SvgIcon);
app.mount('#app')

// 初始化 wow.js
new WOW({
    boxClass: 'wow',
    offset: 100, // 定义浏览器视口底部与隐藏框顶部之间的距离。当用户滚动并到达此距离时，隐藏的框会显示出来
    mobile: true, // 在移动设备上打开/关闭WOW.js
    live: true, // 在页面上同时检查新的WOW元素
}).init()
