<template>
  <header class="hello">
    <ul class="nav-l">
      <!-- router-line最终会渲染成a标签，如果想要生成其他标签如span，可以增加 tag='span' 属性 -->
      <!-- 属性跳转地址还可以使用  :to=' ' 动态绑定 -->
        <!-- <router-link :to="homeLink" tag="span">主页</router-link>   -->
      <!-- 属性跳转地址还可以在路由配置时增加'name'属性，然后在这里使用  :to='{name:'HomeLink'}'-->
      <!-- <router-link :to="{name:'loginLink'}">主页</router-link>   -->

      <a class="router-a logo"><img src="..//assets/logo.jpg" alt="" srcset="">点餐系统</a>
      <router-link class="router-a" :to="{name:'homeLink'}">主页</router-link>  
      <router-link class="router-a" :to="{name:'menuLink'}">菜单</router-link>
      <router-link class="router-a" :to="{name:'adminLink'}">管理</router-link>
      <router-link class="router-a" :to="{name:'aboutLink'}" append>关于我们</router-link>
      <!-- <router-link class="router-a" to='/about/n'>关于我们</router-link> -->
    </ul>
    <ul class="nav-r">
      <router-link class="router-a" :to="{name:'loginLink'}">登录</router-link>
      <router-link class="router-a" :to="{name:'registerLink'}">注册</router-link>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      homeLink : '/home'
    }
  },
  created(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
  margin:10px auto;
  overflow: hidden;
}
ul{
  height:35px;
  padding:0;
  margin:10px 0;
}
.nav-l{
  float:left;
}
.nav-r{
  float:right;
}
.nav-l .logo{
  position: relative;
  padding-left:20px;
  font-size: 20px;
  color:#525252;
}
.nav-l .logo img{
  width:25px;
  position:absolute;
  top:4px;
  left:-4px;
}
.router-a{
  margin:0 5px;
  padding:3px;
  line-height:35px;
  font-size: 16px;
  color:#666;
  text-decoration: none;
  vertical-align: middle;
}
.router-link-active{
  font-weight: 600;
}

</style>
