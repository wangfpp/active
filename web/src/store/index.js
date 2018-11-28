import Vue from 'vue';
import Vuex from 'vuex';
import { userServer } from '@/server/user';
Vue.use(Vuex);
export default new Vuex.Store({
    state: { //　定义需要的状态
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
    },
    mutations: {　 // 更新Vuex的状态
        setUserInfo: (state, value) => {
            state.userInfo = value;
            localStorage.setItem('userInfo', JSON.stringify(value));
        }
    },
    actions: { //　具体的API某个需要存储数据的接口
        userInfo: ({ commit }, params) => {
            return new Promise((resolve, reject) => {
                userServer.login(params).then(res => {
                    resolve(res);
                    commit('setUserInfo', res.user); // commit 
                }).catch(err => {
                    reject(err)
                });
            })
        }
    }
});