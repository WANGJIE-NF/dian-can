<template>
  <div class="menu">
    <div class="left">
      <table>
        <thead>
          <tr>
            <td>尺寸</td>
            <td class="text-ali-cen">价格</td>
            <td class="text-ali-cen">加入</td>
          </tr>
        </thead>
        <tbody v-for="item in menuItems" :key="item.name">
          <tr >
            <td><strong>{{item.breed}}</strong></td>
          </tr>
          <tr v-for="option in item.options" :key="option.name">
            <td>{{option.size}} 寸</td>
            <td class="text-ali-cen">{{option.price}}RMB</td>
            <td class="text-ali-cen">
              <button class="addItem" v-on:click='onAddItem(item.breed,option.size,option.price)'>+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="right">
      <div class="yesshoppingCart" v-if="shoppingCart.length>=1">
        <table>
        <thead>
          <tr>
            <td>品种</tD>
            <td class="text-ali-cen">数量</tD>
            <td class="text-ali-cen">价格</tD>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in shoppingCart" :key="item.index">
            <td>{{item.breed}}{{item.size}}寸</td>
            <td class="text-ali-cen">
              <button class="reduceNumber" v-on:click='onReduceNumber(item,index)'>-</button>
              <span>{{item.number}}</span>
              <button class="addNumber" v-on:click='onAddNumber(item,index)'>+</button>
            </td>
            <td class="text-ali-cen">{{item.price}}RMB</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-ali-cen">总价：{{total}}RMB</td>
          </tr>
        </tfoot>
      </table>
      <button class="submit">提交</button>
      </div>
      <div v-else>{{shoppingCartText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      menuItems : [],
      shoppingCart : [],
      total:'',
      shoppingCartText: '当前购物车为空'
    }
  },

  methods:{

    // 添加到购物车
    onAddItem(breed,size,price){
      let yesNameSize = ''; 
      // shoppingCart长度大于0，且有该name属性和该尺寸，则 number++，
      if(this.shoppingCart.length > 0){
        yesNameSize = this.shoppingCart.some(item => {
          return item.breed == breed && item.size == size ? item.number ++ : false
        })
      }
      // 如果shoppingCart中没有该nameSize的对象，则添加该对象的部分属性
      if(!yesNameSize){
        let item = {
          breed,
          size,
          price,
          number: 1,
        }
        this.shoppingCart.push(item)
      }
    },

    // 减少数量
    onReduceNumber(item,index){
      if(item.number <= 1){
        this.shoppingCart.splice(index,1);
      }else{
        item.number--;
      }
    },

    // 增加数量
    onAddNumber(item,index){
      item.number++;
    },
    
    // 获取数据库数据
    fetchData(){
      fetch('https://wd9086734151cepuuy.wilddogio.com/menujj.json')
        .then(res => {
          return res.json();
        })
        .then(res => {
          // 储存到改组件中
          this.menuItems = res;
        })
        .catch(err => {
          console.log(err);
        })
    },

    // 计算总价
    countTotal(){
      this.total = this.shoppingCart.reduce((pre,cur) => {
        return cur.price * cur.number + pre;
      },0)
    },
   
  },

  computed: {
    // 在vuex中获取 menuItems 数据
    getMenuItems(){
      return this.$store.getters.getMenuItems;
    }
  },

  watch: {
    shoppingCart: {
      handler(newval, old){
        this.countTotal()
      },
      deep: true,
    }
  },

  created(){
    this.fetchData();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu{
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
}
.left{
  flex-basis: 600px;
}
.right{
  flex-basis: 400px;
  padding-left: 20px;
  border-left: 1px solid #aaa;
}
table{
  width: 100%;
}

thead tr td{
  font-size: 16px;
  font-weight: 600;
}
.left thead tr td:first-child{
  width: 200px;
}
.right thead tr td:first-child{
  width: 160px;
}

.left tbody tr:first-of-type td{
  padding-top: 20px;
  font-size: 16px;
  font-weight: 600;
}

.left tbody button.addItem{
  padding: 0 10px;
  border-radius: 2px;
  outline: none;
  font-size: 20px;
  background-color: #a8afa8;
  color: #fff;
}
.text-ali-cen{
  text-align: center;
}

.right tbody tr:first-of-type td{
  padding-top: 20px;
  font-size: 14px;
}
.right tfoot tr:first-of-type td{
  padding-top: 30px;
}

button.addNumber,
button.reduceNumber{
  width: 20px;
  padding: 0;
  outline: none;
}

button.submit{
  display: block;
  width: 80%;
  height: 30px;
  margin: 20px auto;
  border-radius: 3px;
  border:none;
  background-color: #089e1a;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  outline: none;
}
button.submit:hover{
  border: 2px solid darkgreen;
}

</style>
