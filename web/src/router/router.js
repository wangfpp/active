import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import { Message } from 'iview'
import 'iview/dist/styles/iview.css'

import Home from '@/page/home/home';
import Login from '@/page/login/login';
import Register from '@/page/login/register';
import PersonCenter from '@/page/personal/person_center.vue';


Vue.use(Router);
Vue.prototype.$Message = Message;

export default new Router({
    routes: [{
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/home',
            component: Home,
            children: [{
                    path: 'home',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/home/personspace',
                    name: 'personCenter',
                    component: PersonCenter
                }
            ]
        }
    ]
});