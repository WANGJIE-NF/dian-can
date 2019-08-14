<template>
  <div id="app">
    <AppHeader></AppHeader>
    <router-view/>

    <!-- 组件复用 -->
    <div class="fy">
      <router-view name=file></router-view>
    </div>
  </div>
</template>

<script>
  import AppHeader from './components/Header'

export default {
  name: 'App',
  components : {
    AppHeader
  },
}
</script>

<style>
div#app{
  width:1000px;
  margin:0 auto;
}
div.fy{
  margin:10px 0;
}
body{
  color: #424242;
  letter-spacing: 1px
}
</style>
