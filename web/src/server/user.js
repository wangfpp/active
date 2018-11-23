import axios from 'axios';
import Url from '../config/basecnf';
const userServer = {
    register: (params => {
        return new Promise((resolve, reject) => {
            axios.post(`/register`, params).then(res => {
                resolve(res.data.data);
            }).catch(err => {
                reject(err.response.data);
            });
        });
    }),
    login: (params => {
        return new Promise((resolve, reject) => {
            axios.post('/login', params).then(res => {
                resolve(res.data.data);
            }).catch(err => {
                reject(err.response.data);
            });
        })
    })
};
const b = {
    a() {

    }
}
export {
    userServer,
    b
};