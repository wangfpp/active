<template>
    <div id="usermanage">
        <Table :loading="isLoading" :columns="columns" :data="userList" :stripe="true"></Table>
    </div>
</template>

<script>
import  { Table } from 'iview';
import { userServer } from '../../server/user';
export default {
    name: 'usermanage',
    data() {
        return {
            isLoading: true, //　列表获取时显示Loading
            columns: [
                {
                    title: '登录名',
                    key: 'phone'
                },
                {
                    title: '昵称',
                    key: 'name'
                },
                {
                    title: '邮箱',
                    key: 'email'
                },
                {
                    title: '状态',
                    key: 'isable'
                }
            ],
            userList: []
        }
    },
    components: {
        Table
    },
    methods: {
        queryUser(params) {
            userServer.queryUser(params).then(res => {
                this.isLoading = false;
                res.users.forEach(el => {
                    el.isable = el.isable == 1 ? '正常' : '禁用';
                });
                this.userList = res.users;
            }, err => {
                this.$message({type: 'error', content: '获取失败'});
            });
        },
    },
    mounted() {
        this.queryUser({});
    },
}
</script>

<style lang="scss" scoped>

</style>

