<template>
    <div id="myheader">
        <Icon type="logo-github" size="26"/>
        {{this.$store.state.userName ? this.$store.state.userName : this.$store.state.phoneNum}}
    </div>
</template>

<script>
import { Icon } from 'iview'
export default {
    name: 'myheader',
    data() {
        return {

        }
    },
    components: {
        Icon
    }
}
</script>

<style lang="scss" scoped>
    #myheader{
        height: 60px;
        background: #515a6e;
        line-height: 60px;
        color: #fff;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>

