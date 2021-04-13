<template>
   <div id="detail">
     <DetailBavBar class="detail-nav" @titleClick="titleClick" ref="nav"/>
     <scroll
       class="detail-content"
       ref="scroll"
       :probetype="3"
       @scroll="contentScroll"
       @pullingUp="loadMore">
       <DetailSwiper :topimages="topImages"/>
       <DetailBaseInfo :goods="goods"/>
       <DetailShopInfo :shop="shop"/>
       <DetailGoodsInfo :imagesInfo="detailInfo" @imgLoad="imgLoad"/>
       <DetailParamInfo ref="params" :paramInfo="paramsInfo"/>
       <DetailCommentInfo ref="comment" :commentInfo="commentInfo"/>
       <GoodsList ref="recommend" :goods="recommends"></GoodsList>
     </scroll>
     <DetailBottomBar @addToCart="addToCart"/>
     <BackTop @click.native="backClick" v-show="isShowBackTop"/>
     <Toast :message="message" :show="show"/>
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
import DetailBottomBar from './childComps/DetailBottomBar'
import Toast from '../../components/common/toast/Toast'

import Scroll from 'components/common/scroll/Scroll'

import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

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
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast
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
      themeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      message: '',
      show: false
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
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 100)
    },
    contentScroll (position) {
      // BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
      const positionY = -position.y + 44
      // console.log(position)
      const length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          // console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // for (let i = 0; i < length; i++) {
      //   if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) ||
      //     (i === length - 1 && positionY >= this.themeTopYs[i]))) {
      //     this.currentIndex = i
      //     // console.log(this.currentIndex)
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }
    },
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    addToCart () {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.id

      // 加入购物车
      this.$store.commit('addCart', product)
      this.show = true
      this.message = '购物车加入成功'
      setTimeout(() => {
        this.show = false
        this.message = ''
      }, 1500)
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
