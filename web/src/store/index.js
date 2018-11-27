import Vue from 'vue';
import Vuex from 'vuex';
import { userServer } from '@/server/user';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        userInfo: {}
    },
    mutations: {
        setUserInfo: (state, value) => {
            state.userInfo = value;
            localStorage.setItem('userInfo', JSON.stringify(value));
        }
    },
    actions: {
        userInfo: ({ commit }, params) => {
            return new Promise((resolve, reject) => {
                userServer.login(params).then(res => {
                    resolve(res);
                    commit('setUserInfo', res.user);
                }).catch(err => {
                    reject(err)
                });
            })
        }
    }
});