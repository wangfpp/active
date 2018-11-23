<template>
    <div id="register">
        <Form ref="registerForm" :model="userInfo" :rules="rules">
            <FormItem prop='phone'>
                <Input type="text" v-model="userInfo.phone" placeholder="Phonenum/Email">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="userInfo.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem class="confirm">
                <Button type="primary" @click="signin('registerForm')">注册</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script type="text/javascript">
import {Form, Input, Icon, FormItem, Button } from 'iview';
import { userServer } from '../../server/user';
import { validate } from '../../comm/validater.js';
    export default {
        name: 'register',
        data() {
            const validatePhoneOrEmail = (rule, value, callback) => {
                if (value) {
                    if (validate.isPhone(value) || validate.isEmail(value)) {
                        return callback();
                    } else {
                        return callback(new Error('账号格式不正确'));
                    }
                } else {
                    return callback(new Error('账号不能为空'));
                };
                
            };
            const validatePassword = (rule, value, cb) => {
                if (value) {
                    if (value.length < 6) {
                        return cb(new Error('密码长度不能少于６位'));
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
                    phone: '',
                    password: ''
                },
                rules: {
                    phone: [
                        {required: true, validator: validatePhoneOrEmail, trigger: 'blur'}
                    ],
                    password: [
                        {require: true, validator: validatePassword, trigger: 'blur'}
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
                        userServer.register(this.userInfo).then(res => {
                            this.$router.push({path: '/login'});
                        }, err => {
                            console.log(err)
                            this.$Message.error({content: `${err.data.reason}`});
                        });
                    } else {
                        this.$Message.error({content: '请按要求注册账号'});
                    }
                })
            },
            toregister() {
                this.$route.push()
            }
        },
        mounted(){
        }
    }
</script>

<style lang="scss" scoped>
    #register{
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

