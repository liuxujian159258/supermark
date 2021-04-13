import Vue from 'vue'
import Vuex from 'vuex'
// import { INCREMENT } from './mutations-type'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import moduleA from './modules/moduleA'

// 安装插件
Vue.use(Vuex)
// 创建对象
const store = new Vuex.Store({
  state: {
    // 购物车对象
    cartList: [],
    counter: 1000,
    studnets: [
      { id: 110, name: 'why', age: 18 },
      { id: 111, name: 'kobe', age: 24 },
      { id: 112, name: 'james', age: 32 },
      { id: 113, name: 'curry', age: 17 }
    ],
    myPeople: {
      name: 'lxj',
      age: 17
    }
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {
    A: moduleA
  }
})
// 导出store对象
export default store
