<template>
    <div id="home">
        用户名:{{this.$store.state.userName ? this.$store.state.userName : this.$store.state.phoneNum}}
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'home',
        data() {
            return {

            }
        },
        components: {

        },
        methods: {

        },
        mounted(){
            if (!this.$store.state.userName) {
                
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>

