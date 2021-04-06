<template>
  <div id="app">
    <h1>模块A里面的内容</h1>
    <h1>{{ $store.state.A.name }}</h1>
    <button @click="updateName('李四')">修改名称</button>
    <button @click="aupdateName">异步修改名称</button>
    <h1>{{ $store.getters.fullName }}</h1>
    <h1>{{ $store.getters.fullName2 }}</h1>
    <h1>{{ $store.getters.fullName3 }}</h1>
    <h1>{{$store.state.counter}}</h1>
    <button @click="add">+</button>
    <button @click="sub">-</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addStu">添加学生</button>
    <h2>getter</h2>
    <h2>{{ $store.getters.powerCounter }}</h2>
    <h2>{{ $store.getters.more20stu }}</h2>
    <h2>{{ $store.state.myPeople }}</h2>
    <button @click="updatePeople">更新属性</button>
    <router-view/>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from './components/MainTabBar'
import { INCREMENT } from './store/mutations-type'

export default {
  name: 'app',
  components: {
    MainTabBar
  },
  methods: {
    add () {
      this.$store.commit(INCREMENT)
    },
    sub () {
      this.$store.commit('decrement')
    },
    addCount (count) {
      // this.$store.commit('incrementCount', 5)
      // 封装提交
      this.$store.commit({
        type: 'incrementCount',
        count: count
      })
    },
    addStu () {
      const stu = { is: 121, name: 'alen', age: 38 }
      this.$store.commit('addStu', stu)
    },
    updatePeople () {
      // this.$store.commit('updatePeople')
      // this.$store.dispatch('aupdatePeople', {
      //   message: '我是信息',
      //   success: () => {
      //     console.log('执行成功')
      //   }
      // })
      this.$store.dispatch('aupdatePeople', '我是携带的信息').then(res => {
        console.log('里面完成了提交')
        console.log(res)
      })
    },
    updateName (name) {
      this.$store.commit('updateName', name)
    },
    aupdateName () {
      this.$store.dispatch('aupdateName')
    }
  }
}
</script>
<style>
  @import "./assets/css/base.css";

</style>
