// 所需库
import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import { Message } from 'iview'
import 'iview/dist/styles/iview.css'


// 路由
import Home from '@/page/home/home';
import Login from '@/page/login/login';
import Register from '@/page/login/register';
import Main from '@/page/main/main'; // main home

import PersonCenter from '@/page/personal/person_center'; //个人中心
import imgview from '../page/home/home'; // 图片预览
import history from '../page/home/history' // 历史
import food from '../page/home/food' // 菜品

import checkbill from '../page/bill/checkbill' // 查看账单
import addactive from '../page/bill/addbill' //　添加活动

import usermanage from '../page/usermanage/usermanage' //　用户管理




Vue.use(Router);
Vue.prototype.$Message = Message;

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/',
            component: Main,
            redirect: 'home',
            children: [{
                    path: 'home',
                    name: 'home',
                    component: Home
                },
                {
                    path: 'imgview',
                    name: 'imgview',
                    component: imgview
                },
                {
                    path: 'history',
                    name: 'history',
                    component: history
                },
                {
                    path: 'food',
                    name: 'food',
                    component: food
                },
                {
                    path: 'checkbill',
                    name: 'checkbill',
                    component: checkbill
                },
                {
                    path: 'addactive',
                    name: 'addactive',
                    component: addactive
                },
                {
                    path: 'personspace',
                    name: 'personCenter',
                    component: PersonCenter
                },
                {
                    path: 'usermanage',
                    name: 'usermanage',
                    component: usermanage
                },
            ]
        }
    ]
});