<template>
    <div id="personcenter">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="PhoneNum">
                    <Icon type="ios-call" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="name">
                <Input type="text" v-model="formInline.name" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="text" v-model="formInline.email" placeholder="Email">
                    <Icon type="ios-at" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="md-finger-print" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">修改</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script type="text/javascript">
import { Form, FormItem, Input, Icon, Button } from 'iview';
export default {
    name: 'personcenter',
    data() {
        
        return {
            formInline: {
                user: '',
                email: '',
                name: '',
                password: ''

            },
            ruleInline: {

            }
        }
    },
    components: {
        Form, FormItem, Input, Icon, Button
    },
    methods: {
        handleSubmit(form) {

        }
    },
    mounted(){
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
            div[class="ivu-form-item"]{
                display: block;
                height: 40px;
                width: 200px;
            }
        }
    }
</style>

