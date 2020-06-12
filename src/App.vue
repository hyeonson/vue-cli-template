<template>
  <div id="app">
    <!-- <img src="./assets/images/partners_logo2.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components:{
  },
}
</script>

<style>
#app {
  font-family: 'Noto Sans KR', 'NanumSquare', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
