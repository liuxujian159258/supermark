export default {
  powerCounter (state) {
    return state.counter * state.counter
  },
  more20stu (state) {
    return state.studnets.filter(s => s.age > 20)
  }
}
