<template>
  <div class="admin">
    <div class="left">
      <h2 class="headAddText">添加新的pizza</h2>
      <form >
        <div>
          <p>
            <label class="font-w-c" >品种</label>
            <input required v-on:blur='onBlur' v-bind:class="{noVal:correct1.breed===false}" type="text" name="breed"  autocomplete='off' v-model="addMenuItem.breed">
          </p>
          <p>
            <label class="font-w-c describe" >描述</label>
            <textarea v-on:blur='onBlur' v-bind:class="{noVal:correct1.description===false}" name="description"  cols="30" rows="10" autocomplete='off' v-model="addMenuItem.description"></textarea>
          </p>
        </div>

        <div>
          <p class="font-w-c">选项1：</p>
          <p>
            <label >尺寸</label>
            <input v-on:blur='onBlurTypeNumber' v-bind:class="{noVal:correct1.size1===false}" type="text" name="size1"  autocomplete='off' v-model="addMenuItem.size1">
          </p>
          <p>
            <label >价格</label>
            <input v-on:blur='onBlurTypeNumber' v-bind:class="{noVal:correct1.price1===false}" type="text" name="price1"  autocomplete='off' v-model="addMenuItem.price1">
          </p>
        </div>
        <div>
          <p class="font-w-c">选项2：</p>
          <p>
            <label >尺寸</label>
            <input v-on:blur='onBlurTypeNumberOptional' v-bind:class="{noVal:correct2.size2===false}" type="text" name="size2"  autocomplete='off' v-model="addMenuItem.size2">
          </p>
          <p>
            <label >价格</label>
            <input v-on:blur='onBlurTypeNumberOptional' v-bind:class="{noVal:correct2.price2===false}" type="text" name="price2"  autocomplete='off' v-model="addMenuItem.price2">
          </p>
        </div>
        <div v-if="allCorrect==false" type='button' class="but-addMenuItem" >添加</div>
        <button v-else  type="button" class="but-addMenuItem but-allCorrectTrue" v-on:click="onAddMenuItem">添加</button>
      </form>
    </div>
    <div class="right">
      <h2 class="headMenu">menu</h2>
      <table cellspacing="0">
        <thead>
          <tr>
            <td>品种</td>
            <td>删除</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in menuItems" :key="index">
            <td>{{item.breed}}</td>
            <td><button v-on:click="onDeleteMenuItem(item,index)" >删除</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return { 
      addMenuItem :{},

      // 判断 addMenuItem 中的数据是否正确
      correct1: {
        breed : '',
        description : '',
        size1 : '',
        price1 : '',
       
      },
      // 可选项
      correct2: {
        size2 : '',
        price2 : '',
      },

      allCorrect: '',
      menuItems : []
    }
  },

  methods: {

    // 失去焦点时检测 值
    onBlur(event){
      const name = event.target.name;
      const val = event.target.value;
      if(val){
        this.correct1[name] = true;
      }else{
          this.correct1[name] = false;
      }
      this.allCorrectFun();
    },
    
    onBlurTypeNumber(event){
      const name = event.target.name;
      const val = event.target.value;
      if(val){
        this.valType('correct1',name,val);
      }else{
          this.correct1[name] = false;
      }
      this.allCorrectFun();
    },

    onBlurTypeNumberOptional(event){
      const name = event.target.name;
      const val = event.target.value;
      if(val){
        this.valType('correct2',name, val);
      }else{
          this.correct2[name] = '';
      }
      this.allCorrectFun();
    },

    valType(correct, name, val){
      let reg = this.regNumber(val) ;
      if(reg){
        this[correct][name] = true;
      }else{
        this[correct][name] = false;
      }
    },

    regNumber(theObj) {
      var reg = /^[0-9]+\.?[0-9]*$/;
      if (reg.test(theObj)) {
        return true;
      }
      return false;
    },

    allCorrectFun(){
      let correct1Val = [];
      let correct2Val = [];
      for(let pro in this.correct1){
        correct1Val.push(this.correct1[pro]);
      }
      for(let pro in this.correct2){
        correct2Val.push(this.correct2[pro]);
      }
      let allCorrect1 = correct1Val.every(val => val === true)
      let allCorrect2 = correct2Val.every(val => val === true) || correct2Val.every(val => val === '')
      if(allCorrect1 && allCorrect2){
        this.allCorrect = true;
      }else{
        this.allCorrect = false;
      }
      
    },

    onAddMenuItem(){
      let menuItem = {
        breed : this.addMenuItem.breed,
        description : this.addMenuItem.description,
        options : [
          {
            size : this.addMenuItem.size1,
            price : this.addMenuItem.price1,
          },
          {
            size : this.addMenuItem.size2,
            price : this.addMenuItem.price2,
          },
        ]
      };
      // this.$axios.post('/menujj.json', menuItem)
      //   .then(data => {
      //     console.log(data)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      fetch('https://wd9086734151cepuuy.wilddogio.com/menujj.json', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body:JSON.stringify(menuItem)
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          console.log('提交成功',res.name)
          this.menuItems.push(menuItem);
          this.addMenuItem = {};
        })
        .catch(err => {
          console.log(err);
        })
    },

    onDeleteMenuItem(item,index){

      this.menuItems.splice(index,1)

      fetch('https://wd9086734151cepuuy.wilddogio.com/menujj/'+ item.id +'/.json', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then(res => {
        console.log('删除成功');
        })
      .then(err => {
        console.log(err);
      })
    },

    fetchData(){
      fetch('https://wd9086734151cepuuy.wilddogio.com/menujj.json')
        .then(res => {
          return res.json()
        })
        .then(res => {
          let menuItems = [];
          for(let pro in res){
            res[pro].id = pro;
            menuItems.push(res[pro])
         }
         this.menuItems = menuItems;
        })
      .catch(err => {
        console.log(err);
      })
    },

  },

  created(){
    this.fetchData();
  },

  // watch:{
  //   correct:{
  //     handler(newval,old){
  //       console.log('刷新')
  //     }
  //   },
  //   breed: true,

  // }

} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin{
  display: flex;
  justify-content: space-around;
}
.noVal{
  border: 1px solid red;
}

.left{
  width: 600px;
}
.right{
  width: 300px;
}

.font-w-c{
  font-weight: 600;
}

input,
textarea{
  width: 500px;
  padding: 5px 5px;
  border: 1px solid #888;
  border-radius: 3px;
  font-size: 16px;
}
.describe{
  vertical-align: top   
}
h2{
  color: #424242;
}

.but-addMenuItem{
  display: block;
  width: 200px;
  height: 40px;
  margin: 0 auto;
  background-color: #96e09a;
  border: none;
  border-radius: 4px;
  color: #FFF;
  text-align: center;
  line-height: 40px;
}
.but-allCorrectTrue{
  background-color: #09ce13;
}
table thead tr td{
  width: 200px;
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
}
table thead tr td:nth-child(1){
  width: 300px;
}
table tbody tr td{
  padding: 5px 0;
  border-top: 1px solid #aaa;
}

</style>
