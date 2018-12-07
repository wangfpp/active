<template>
    <div id="personcenter">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.phone" placeholder="PhoneNum" :disabled="true">
                    <Icon type="ios-call" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="name">
                <Input type="text" v-model="formInline.name" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="email">
                <Input type="text" v-model="formInline.email" placeholder="Email">
                    <Icon type="ios-at" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="md-finger-print" slot="prepend"></Icon>
                </Input>
            </FormItem>
        </Form>
        <Button type="primary" @click="handleSubmit('formInline')">修改</Button>
        <Button　type="primary"　@click="loginout">退出登录</Button>
    </div>
</template>

<script type="text/javascript">
import { Form, FormItem, Input, Icon, Button } from 'iview';
import { userServer } from '../../server/user';
import { validate } from '../../comm/validater';
export default {
    name: 'personcenter',
    data() {
        const isPhone = (rule, value, cb) => {
            if (validate.isPhone(value)){
                return cb();
            } else {
                return cb(new Error('手机号格式不对'));
            }
        };
        const isEmail = (rule, value, cb) => {
            if  (value == '') {
                return cb();
            } else {
                if (validate.isEmail(value)) {
                    return cb();
                } else {
                    return cb(new Error('邮箱格式不正确'));
                }
            }
        };
        const limitName = (rule, value, cb) => {
            if (validate.limitName(value)){
                return cb();
            } else {
                return cb(new Error('用户名限制'));
            }
        }
        return {
            formInline: {
                phone: this.$store.state.userInfo.phone,
                email: this.$store.state.userInfo.email,
                name: this.$store.state.userInfo.name,
                password: ''

            },
            ruleInline: {
                phone: [{
                    requier: true, validator: isPhone, tigger: 'blur'
                }],
                email: [{
                    require: true, validator: isEmail, tigger: 'blur'
                }],
                name: [{
                    require: true, validator: limitName, tigger: 'blur'
                }]
            }
        }
    },
    watch: {
        '$store': function (val) {
            console.log(val);
        } 
    },
    components: {
        Form, FormItem, Input, Icon, Button
    },
    methods: {
        handleSubmit(form) {
            userServer.modifyInfo(this.deleteEmptyProperty(this.formInline)).then(res => {
                console.log(res);
                this.queryUser();
            }, err => {
                this.$Message.error({'content': err.reason});
            });
        },
        loginout() {
            userServer.loginout().then(res => {
                this.$router.push({path: '/login'})
            }, err => {
                console.log(err);
                this.$Message.error({'content': err.reason});
            });
        },
        queryUser() {
            userServer.queryUser({phone: this.formInline.phone}).then(res => {
                console.log(res);
            }, err => {
                console.log(err);
            });
        },
        deleteEmptyProperty(object){
            for (var i in object) {
                var value = object[i];
                if (typeof value === 'object') {
                    if (Array.isArray(value)) {
                        if (value.length == 0) {
                        delete object[i];
                        continue;
                        }
                    }
                    this.deleteEmptyProperty(value);
                    if (this.isEmpty(value)) {
                        delete object[i];
                    }
                } else {
                    if (value === '' || value === null || value === undefined) {
                        delete object[i];
                    }
                }
            }
            return object;
        },
        isEmpty(object) {
            for (var name in object) {
                return false;
            }
            return true;
        }
    },
    mounted(){
        this.queryUser();
    }
}
</script>

<style lang="scss" scoped>
    #personcenter{
        width: 100%;
        height: 100%;
        form{
            width: 300px;
            margin: 0 auto;
            text-align: center;
            
        }
    }
</style>

