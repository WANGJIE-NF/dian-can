import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        // 设置属性
        menuItems : [],
    },
    getters: {
        // 获取属性的状态
        getMenuItems: state => state.menuItems
    },
    mutations: {
        // 改变属性的状态
        setMenuItems(state, data){
            state.menuItems = data;
        },
        removeItem(state, index){
            state.menuItems.splice(index, 1);
        },
        pushmenuItem(state, menuItem){
            state.menuItems.push(menuItem)
        }
    },
    actions: {
        // 应用于mutations
    }

})