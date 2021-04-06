export default {
  // context 上下文
  aupdatePeople (context, payload) {
    // setTimeout(() => {
    //   context.commit('updatePeople')
    //   console.log(payload)
    //   console.log(payload.message)
    //   payload.success()
    // }, 1000)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit('updatePeople')
        console.log(payload)
        resolve('11111')
      }, 1000)
    })
  }
}
