<template>
    <div class="about">
        <div class="nav">
            <router-link :to="{name:'newsLink'}">新闻</router-link>
            <router-link :to="{name:'contactLink'}">联系我们</router-link>
            <router-link :to="{name:'fileLink'}">点餐文档</router-link>
            <router-link :to="{name:'deliveryLink'}">快递</router-link>
        </div>
        <div class="content">
            <router-view/>
        </div>
  </div>
</template>

<script>
export default {
    name: 'About',
    data () {
        return {
           
        }
    },
    methods : {
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* div.about{
    display:inline-block;
} */
div.nav{
    display: inline-block;
    width:160px;
}
a{
    display:inline-block;
    width:130px;
    padding:10px;
    margin:10px 0;
    border-radius: 4px; 
    border:1px solid #999;
    background-color:rgb(244, 255, 242);
    color:#424242;
    text-decoration: none;
}

.router-link-active{
    background-color:rgb(178, 224, 166)
}
.content{
    float:right;
    width:500px;
    padding:10px 0;
}
</style>
