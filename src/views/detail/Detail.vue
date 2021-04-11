<template>
   <div id="detail">
     <DetailBavBar class="detail-nav" @titleClick="titleClick"/>
     <scroll
       class="detail-content"
       ref="scroll"
       @pullingUp="loadMore">
       <DetailSwiper :topimages="topImages"/>
       <DetailBaseInfo :goods="goods"/>
       <DetailShopInfo :shop="shop"/>
       <DetailGoodsInfo :imagesInfo="detailInfo" @imgLoad="imgLoad"/>
       <DetailParamInfo ref="params" :paramInfo="paramsInfo"/>
       <DetailCommentInfo ref="comment" :commentInfo="commentInfo"/>
       <GoodsList ref="recommend" :goods="recommends"></GoodsList>
     </scroll>
   </div>
</template>

<script>
import DetailBavBar from './childComps/DetailBavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll'

import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, getRecommend, Goods, Shop, GoodsParams } from 'network/detail'
import { debounce } from '../../util/debounce'
import { itemListenerMixin } from '../../util/mixin'

export default {
  name: 'Detail',
  components: {
    DetailBavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
  },
  mixins: [itemListenerMixin],
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    // 监听轮播中图片是否加载完成
    this.$bus.$on('detailImageLoad', () => {
      // console.log('---------')
      // this.$refs.scroll.refresh()
      refresh()
    })
    // this.$bus.$on('itemImageLoad', () => {
    //   // console.log('---------')
    //   // this.$refs.scroll.refresh()
    //   refresh()
    // })
  },
  data () {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      themeTopY: null
    }
  },
  created () {
    this.getDetail()
    this.getRecommend()
    this.getThemeTopY()
  },
  methods: {
    getDetail () {
      this.id = this.$route.params.id
      // console.log(this.id)
      getDetail(this.id).then(res => {
        const data = res.result
        console.log(data)
        this.topImages = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log(this.goods)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
    },
    getRecommend () {
      getRecommend().then(res => {
        // console.log(res)
        this.recommends = res.data.list
        console.log(this.recommends)
      })
    },
    imgLoad () {
      // debounce(this.$refs.scroll.refresh, 200)
      this.newRefresh()
      this.themeTopY()
    },
    loadMore () {
      console.log('====')
    },
    titleClick (index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 100)
    },
    getThemeTopY () {
      this.themeTopY = debounce(() => {
        console.log('tmeY')
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      }, 100)
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
    /*position: relative;*/
    /*z-index: 9;*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    background-color: #ffffff;
  }
  .detail-content {
    height: calc(100% - 44px);
    overflow: hidden;
    /*!*margin-top: 44px;*!*/
    /*position: absolute;*/
    /*top: 50px;*/
    /*!*bottom: 49px;*!*/
    /*left: 0;*/
    /*right: 0;*/
  }
</style>
