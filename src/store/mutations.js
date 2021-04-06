import { INCREMENT } from './mutations-type'
import Vue from 'vue'

export default {
  // 方法
  [INCREMENT] (state) {
    state.counter++
  },
  decrement (state) {
    state.counter--
  },
  incrementCount (state, payload) {
    console.log(payload)
    // state.counter += count
  },
  addStu (state, stu) {
    state.studnets.push(stu)
  },
  updatePeople (state) {
    // state.people.address = '湖南'
    Vue.set(state.myPeople, 'address', '湖南')
    Vue.delete(state.myPeople, 'age')
  }
}
