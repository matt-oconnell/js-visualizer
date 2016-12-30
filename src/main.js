import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import HomeView from './views/HomeView';
import VisualizerView from './views/VisualizerView';
import store from './store/store';
import App from './App';

Vue.use(VueRouter);
Vue.use(ElementUI, { locale });

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: HomeView },
    { path: '/stack', component: VisualizerView },
    { path: '*', redirect: '/' }
  ]
});

new Vue(Vue.util.extend({
  store,
  router
}, App)).$mount('div');
