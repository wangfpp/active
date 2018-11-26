import Vue from 'vue';
import Vuex from 'vuex';
import { userServer } from '@/server/user';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        userName: '',
        phoneNum: '',
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
            userServer.login(params).then(res => {
                console.log(res);
                commit('setUserInfo', res.user);
            }, err => {
                console.log(err);
            });
        }
    }
});