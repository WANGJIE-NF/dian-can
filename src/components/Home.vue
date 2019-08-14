<template>
  <div class="home">
    <div class="dg">
      <div class="background">
        <h2>欢迎大家品尝蛋糕</h2>
        <h3>这里有大家非常喜欢的蛋糕</h3>
        <button class="btn" v-on:click='goToMent()'>set out</button>
      </div>
    </div>
    <div class="ps">
      <div class="background">
        <h2>欢迎大家品尝披萨</h2>
        <h3>这里有大家非常喜欢的披萨</h3>
        <button class="btn" v-on:click='goToMent()'>set out</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      title : '组件内的守卫有beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave'
    }
  },
  methods : {
    goToMent(){
      // 跳转到上一次浏览的页面
      // this.$router.go(-1);

      // 跳转到指定的地址或name下
      // this.$router.replace('/menu');
      // this.$router.replace({name : 'menuLink'});
    
      // 跳转到指定的地址或name下
      // this.$router.push('/menu');
      // this.$router.push({name : 'menuLink'});
    }
  },

  // 组件内的守卫
  // 进入前
  // beforeRouteEnter(to, from, next){
  //   next(vm =>{
  //    alert(vm.title)
  //   })
  // },
  
    // 离开前
  // beforeRouteLeave(to, from, next){
  //   if(confirm('确定离开吗？') == true){
  //     next()
  //   }else{
  //     next(false)
  //   }
  // },
  
  created(){
    console.log(this.$route.params.email)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div.dg,
div.ps{
  background-image: url(..//assets/dg.jpg);
  background-size:100%;
  height:85vh;
  overflow: hidden;
}
div.ps{
  margin-top:10px;
  background-image: url(..//assets/ps.jpg);
}
div.background{
  width:300px;
  padding:20px;
  margin:20px auto;
  text-align: center;
  border-radius: 4px;
  background-color:#fff;
  opacity:0.8;
}
h2,h3{
  margin-bottom:20px;
}
.btn{
  background-color: rgb(0, 204, 0);
  border:none;
  border-radius: 3px;
  padding:6px 15px;
  color:#fff;
  outline: none;
  font-size: 16px;
  
}
</style>
