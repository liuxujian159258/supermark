<template>
   <div id="detail">
     <DetailBavBar class="detail-nav"/>
     <scroll
       class="detail-content"
       ref="scroll"
       @pullingUp="loadMore">
       <DetailSwiper :topimages="topImages"/>
       <DetailBaseInfo :goods="goods"/>
       <DetailShopInfo :shop="shop"/>
     </scroll>
   </div>
</template>

<script>
import DetailBavBar from './childComps/DetailBavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'

import Scroll from 'components/common/scroll/Scroll'

import { getDetail, Goods, Shop } from 'network/detail'
import { debounce } from '../../util/debounce'

export default {
  name: 'Detail',
  components: {
    DetailBavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    // eslint-disable-next-line vue/no-unused-components
    Scroll
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    // 监听item中图片是否加载完成
    this.$bus.$on('detailImageLoad', () => {
      // console.log('---------')
      // this.$refs.scroll.refresh()
      refresh()
    })
  },
  data () {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {}
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.id = this.$route.params.id
      getDetail(this.id).then(res => {
        const data = res.result
        console.log(data)
        this.topImages = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log(this.goods)
        this.shop = new Shop(data.shopInfo)
      })
    },
    loadMore () {
      console.log('====')
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
    background-color: #ffffff;
  }
  .detail-content {
    height: calc(100% - 44px);
    /*overflow: hidden;*/
    /*!*margin-top: 44px;*!*/
    /*position: absolute;*/
    /*top: 50px;*/
    /*!*bottom: 49px;*!*/
    /*left: 0;*/
    /*right: 0;*/
  }
</style>
