<template>
    <div id="main">
        <myhead></myhead>
        <myMenu></myMenu>
    </div>
</template>

<script>
import myMenu from '@/components/menu';
import myhead from '@/components/myheader';
export default {
    name: 'home',
    data() {
        return {

        }
    },
    components: {
        myMenu,
        myhead
    },
    methods: {

    },
    mounted(){
        if (!this.$store.state.userName) {
            
        }
    }
}
</script>

<style lang="scss" scoped>
    #main{
        width: 100%;
        height: 100%;
    }
</style>
