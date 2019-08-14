<template>
  <div class="register">

    <img src="../assets/meituan.jpg" alt="">

    <form >
      <div class="from-group">
        <label for="email">email</label>
        <input type="email" v-model='email' class="email">
      </div>

      <div class="from-group">
        <label for="passwork">密码</label>
        <input type="passwork" v-model='passwork' class="passwork">
      </div>

      <div class="from-group">
        <label for="confirm-passwork">确认密码</label>
        <input type="passwork" v-model="confirmPasswork" class="confirm-passwork">
      </div>
      
      <button class='button' type="button" v-on:click='onSubmit'>注册</button>
    </form>
    
  </div>
</template>

<script>
  import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      email : '',
      passwork : '',
      confirmPasswork : '',
    }
  },
    methods : {
      onSubmit(){
        if(this.email == ''){
           alert('请输入邮箱')
        }else if(this.passwork.length < 6){
          alert('请输入大于6位长度的密码')
        }else if(this.passwork === this.confirmPasswork){
          const data = {
            email : this.email, 
            passwork : this.passwork,
          }
          axios.post('/user.json', data)
            .then(res => {
              console.log('注册成功',res)
            })
            .then(err => {
              console.log(err)
            })
          // this.$router.push({name: 'loginLink'})
      }else{
        alert('两次密码不一致')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register{
  width: 800px;
  padding: 10px 0;
  margin: 0 auto;
  border: 1px solid #aaa;
  border-radius: 3px;
  text-align: center;
}
img{
  width: 200px;
}
.from-group{
  width: 300px;
  margin: 10px auto;
}
label{
  display: block;
  text-align: left;
  margin: 0px;
}
input{
  width: 100%;
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px;
}
.button{
  width: 50px;
  padding: 5px 0;
  border-radius: 3px;
  border: none;
  background: rgb(1, 168, 9);
  color:#fff;
}
</style>
