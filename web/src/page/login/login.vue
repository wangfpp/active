<template>
    <div id="login">
        <Form ref="loginForm" :model="userInfo" :rules="rules">
            <FormItem prop='user'>
                <Input type="text" v-model="userInfo.user" placeholder="Phonenum/email">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>

            <FormItem prop="password">
                <Input type="password" v-model="userInfo.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem class="confirm">
                <Button type="primary" @click="signin('loginForm')">登录</Button>
                <a　@click="toregister">去注册</a>
            </FormItem>
        </Form>
    </div>
</template>

<script type="text/javascript">
import {Form, Input, Icon, FormItem, Button } from 'iview';
import { validate } from '../../comm/validater';
import { userServer } from '../../server/user';
export default {
    name: 'login',
    data() {
        const validateUser = (rule, value, cb) => {
            if (value) {
                if (validate.isPhone(value) || validate.isEmail(value)) {
                    return cb();
                } else {
                    return cb(new Error('账号格式不正确'));
                }
            } else {
                return cb(new Error('账号不能为空'));
            }
        };
        const validatePassword = (rule, value, cb) => {
                if (value) {
                    if (value.length < 6) {
                        return cb(new Error('密码长度不能少于6位'));
                    }　else if (value.length > 16) {
                        return cb(new Error('密码长度不能超过16位'));
                    } else {
                        return cb();
                    }
                } else {
                    return cb(new Error('密码不能为空'));
                }
            };
        return {
            userInfo: {
                user: '',
                password: ''
            },
            rules: {
                user: [
                    {require: true, validator: validateUser, tigger: 'blur'}
                ],
                password: [
                    {require: true, validator: validatePassword, tigger: 'blur'}
                ]
            }
        }
    },
    components: {
        Form,
        Input,
        Icon,
        FormItem,
        Button
    },
    methods: {
        signin(name) {
            this.$refs[name].validate( valid => {
                if (valid) {
                    userServer.login(this.userInfo).then(res => {
                        console.log(res);
                        this.$Message.success({content: 'Success'});
                        this.$store.state.userName = res.user.name;
                        this.$store.state.phoneNum = res.user.phone;
                        if (!res.user.name) {
                            this.$router.push({path: '/home/personspace'});
                        } else {
                            this.$router.push({path: '/home'});
                        }
                    }, err => {
                        this.$Message.error({content: `${err.data.reason}`});
                    })
                    
                } else {
                    this.$Message.error('fail');
                }
            })
        },
        toregister() {
            this.$router.push({path: 'register'})
        }
    },
    mounted(){

    }
}
</script>

<style lang="scss" scoped>
    #login{
        width: 400px;
        height: 100%;
        padding-top: 40px;
        box-sizing: border-box;
        margin: 0 auto;
        .confirm{
            text-align: center;
        }
    }
</style>

