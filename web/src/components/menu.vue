<template>
  <div id="menu">
     	<Layout>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="my" theme="light" width="auto" :open-names="['1']" @on-select = "changeMenu($event)">
                        <Submenu name="1">
                            <template slot="title" >
                                <Icon type="ios-navigate"></Icon>
                                主页
                            </template>
							<MenuItem name="my" to='imgview'>图片预览</MenuItem>
                            <MenuItem name="history"　to="history">历史</MenuItem>
                            <MenuItem name="food" to="food">菜品</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                账单管理
                            </template>
                            <MenuItem name="checkbill" to="checkbill">账单查看</MenuItem>
                            <MenuItem name="addbill" to="addactive">账单记录</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                用户管理
                            </template>
                            <MenuItem name="3-1" to="usermanage">用户管理</MenuItem>
							<MenuItem name="3-2" to="personspace">个人中心</MenuItem>
							<MenuItem name="3-3" to="modifypassword">修改密码</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <router-view></router-view>
                </Layout>
            </Layout>
        </Layout>
  </div>
</template>

<script>
import { Layout, MenuItem, Menu, Sider, Breadcrumb, BreadcrumbItem, Content, Icon, Submenu} from 'iview';
export default {
	name: 'myMenu',
	data () {
		return {
		}
	},
	components: {
		Layout, MenuItem, Menu, Sider, Breadcrumb, BreadcrumbItem, Content, Icon, Submenu
	},
	methods: {
		changeMenu(e) {
			console.log(e);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	#menu{
		width: 100%;
		height: calc(100% - 60px);
		.ivu-layout{
			width: 100%;
			height: 100%;
		}
	}
</style>
