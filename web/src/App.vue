<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('../static/css/reset.css');
#app {
  width: 100%;
  height: 100%;
  color: #2c3e50;
}
</style>
