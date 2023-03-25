import {
	createApp
} from "vue";
import App from "./App.vue"; // 导入App.vue组件，.vue可省略不写
import router from "./router"; // 导入router目录下所有路由
import store from "./store";
import 'normalize.css';
import './style/index.scss';


createApp(App).use(store).use(router).mount("#app");