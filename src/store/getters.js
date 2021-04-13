export default {
  powerCounter (state) {
    return state.counter * state.counter
  },
  more20stu (state) {
    return state.studnets.filter(s => s.age > 20)
  },
  cartLength (state) {
    return state.cartList.length
  },
  cartList (state) {
    return state.cartList
  }
}
