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
  },
  addCart (state, payload) {
    let oldProduct = null
    for (const item of state.cartList) {
      if (item.iid === payload.iid) {
        oldProduct = item
      }
    }
    if (oldProduct) {
      oldProduct.count += 1
    } else {
      payload.count = 1
      payload.checked = true
      state.cartList.push(payload)
    }
  }
}
