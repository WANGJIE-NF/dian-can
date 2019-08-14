<template>
  <div class="login">
    <img src="../assets/meituan.jpg" alt="">

    <form v-on:submit.prevent='onSubmit'>
      <div class="from-group">
        <label for="email">email</label>
        <input type="email" v-model='email' v-on:blur='emailBlur' class="email">
      </div>

      <div class="from-group">
        <label for="passwork">密码</label>
        <input type="passwork" v-model='passwork'  v-on:blur='passworkBlur' class="passwork">
      </div>

      <button class='button'>登录</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      users: '',
      user: '',

      email : '',
      passwork : '',

      yesEmail : '',
      yesPasswork : '',
    }
  },



  methods : {
    emailBlur(){
      if(!this.users){
        this.yesEmail = false;
        return
      }
      this.user = this.users.find((user,index) =>{
        if(user.email === this.email){
          this.yesEmail = true;
          if(user.passwork === this.passwork){
            this.yesPasswork = true;
            return true;
          }else{
            this.yesPasswork = false;
            return user;
          }
        }else{
          this.yesEmail = false;
          return false;
        }
      })
    },
    
    passworkBlur(){
      if(!this.user){
        this.yespasswork = false;
        return
      }else if(this.user.passwork == this.passwork){
        this.yesPasswork = true;
      }else{
        this.yesPasswork = false;
      }
    },

    onSubmit(){
      if(this.email == ''){
        alert('请输入邮箱')
      }else if(this.yesEmail == false){
        alert('邮箱不存在');
      }else if(this.yesPasswork == false){
        alert('邮箱或密码错误')
      }else{
        // axios.post('/user.json', data)
        console.log('登录成功');
        this.$emit("loginEmail", 'this.email')
        this.$router.push({name: 'homeLink'})
      }

    },
    

    getUsers(){
      this.$axios.get('/user.json')
      .then(res =>{
        const data = res.data;
        let users = [];
        for(let pro in data){
          users.push(data[pro]);
        }
        this.users = users;
      })
      .catch(err => {
        console.log(err)
      })
    },
  },

  created(){
    this.getUsers();
  },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.login{
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
