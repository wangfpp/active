import axios from 'axios';
import Url from '../config/basecnf';
const userServer = {
    register: params => {
        return new Promise((resolve, reject) => {
            axios.post(`/register`, params).then(res => {
                resolve(res.data.data);
            }).catch(err => {
                reject(err.response.data);
            });
        });
    },
    login: params => {
        return new Promise((resolve, reject) => {
            axios.post('/login', params).then(res => {
                resolve(res.data.data);
            }).catch(err => {
                reject(err.response.data);
            });
        })
    },
    authen: () => {
        return new Promise((resolve, reject) => {
            axios.get('/prelogin').then(res => {
                resolve(res.data.data);
            }).catch(err => {
                reject(err.response.data);
            });
        });
    },
    loginout: () => {
        return new Promise((resolve, reject) => {
            axios.get('/loginout').then(res => {
                resolve(res.data.data);
            }).catch(err => {
                reject(err.response.data);
            });
        })
    },
    modifyInfo: params => {
        return new Promise((resolve, reject) => {
            axios.put('/modifyInfo', params).then(res => {
                resolve(res.data.data);
            }).catch(err => {
                reject(err.response.data);
            });
        });
    },
    queryUser: params => {
        return new Promise((resolve, reject) => {
            axios.get('/queryUser', { params: params }).then(res => {
                resolve(res.data.data);
            }).catch(err => {
                reject(err.response.data);
            });
        });
    }
};
const b = {
    a() {

    }
}
export {
    userServer,
    b
};