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
    if (this.probetype === 2 || this.probetype === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        this.$emit('scroll', position)
      })
    }
    if (this.pullupload) {
      // 监听上拉事件
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多')
        this.$emit('pullingUp')
        // 发送网络请求，展示新的数据
      })
    }
  },
  methods: {
    scrollTo (x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
      // console.log('下拉加载')
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
