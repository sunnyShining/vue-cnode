// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './assets/css/reset.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.less';
import './assets/css/responsive.css';
import './assets/css/font-awesome.less';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
