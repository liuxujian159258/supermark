<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probetype: {
      type: Number,
      default: 0
    },
    pullupload: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    // eslint-disable-next-line no-new,no-unused-vars
    this.scroll = new BScroll(this.$refs.wrapper, {
      useTransition: false,
      click: true,
      probeType: this.probetype,
      pullUpLoad: this.pullupload
    })
    this.scroll.on('scroll', (position) => {
      // console.log(position)
      this.$emit('scroll', position)
    })
    // 监听上拉事件
    this.scroll.on('pullingUp', () => {
      // console.log('上拉加载更多')
      this.$emit('pullingUp')
      // 发送网络请求，展示新的数据
    })
  },
  methods: {
    scrollTo (x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>
