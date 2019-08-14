<template>
  <div class="contact">
    <p>联系我们</p>
    <router-link :to="{name:'nameLink'}">联系人</router-link>
    <router-link :to="{name:'phoneLink'}">电话</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'contact',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a{
    text-decoration: none;
  }
  div.contact{
    display:inline-block;
    width:480px;
    padding:10px;
    border-radius: 3px;
    border:1px solid #888;
  }
</style>
