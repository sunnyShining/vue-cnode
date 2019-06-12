
//  sdgdsgsdgsdThe Vue build version to load with the `import` command
// (runtime-only or standalone) has been setsasfas in webpack.base.conf with an alias.

import Vue from 'vue';
import mavonEditor from 'mavon-editor';
import App from './App.vue';
import router from './router';
import store from './store/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.less';
import './assets/css/responsive.css';
import './assets/css/font-awesome.less';
import 'mavon-editor/dist/css/index.css';

Vue.config.productionTip = false;
Vue.config.devtools = false;

if (process.env.NODE_ENV === 'development') {
	Vue.config.devtools = true;
}

Vue.use(mavonEditor);
Vue.use(ElementUI, { size: 'small' });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
