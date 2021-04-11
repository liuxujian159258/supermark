<template>
  <Swiper class="detail-swiper">
    <SwiperItem
      v-for="(item, index) in topimages" :key="index">
      <img :src="item" alt="" @load="detailImageLoad">
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  props: {
    topimages: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    detailImageLoad () {
      this.$bus.$emit('detailImageLoad')
    }
  }
}
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
