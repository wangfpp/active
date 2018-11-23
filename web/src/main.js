// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js' //　路由信息
import store from './store/index';
import iView from 'iview'
Vue.config.productionTip = false

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach(route => {
    iView.LoadingBar.finish();
});

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})