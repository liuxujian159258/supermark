export default {
  state: {
    name: '张三-模块A'
  },
  mutations: {
    updateName (state, payload) {
      state.name = payload
    }
  },
  actions: {
    aupdateName (context) {
      setTimeout(() => {
        console.log(context)
        context.commit('updateName', '刘绪俭')
      }, 1000)
    }
  },
  getters: {
    fullName (state) {
      return state.name + '11111'
    },
    fullName2 (state, getters) {
      return getters.fullName + '22222'
    },
    fullName3 (state, getters, rootState) {
      return getters.fullName2 + rootState.counter
    }
  }
}
