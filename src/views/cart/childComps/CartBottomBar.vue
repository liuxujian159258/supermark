<template>
    <div class="bottom-bar">
      <div class="check-content">
        <check-button
          class="check-button"
          @click.native="checkClick"
          :ischecked="isSelectAll"/>
        <span>全选</span>
      </div>
      <div class="price">
        {{totalPrice}}
      </div>
      <div class="calculate">
        去结算:({{checkLength}})
      </div>
    </div>
</template>

<script>
import CheckButton from './CheckButton'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  methods: {
    checkClick () {
      // console.log('能够')
      if (this.isSelectAll) {
        // eslint-disable-next-line no-return-assign
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {
        // eslint-disable-next-line no-return-assign
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  },
  computed: {
    totalPrice () {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0)
    },
    checkLength () {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll () {
      if (this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 44px;
    background-color: #eeeeee;
    display: flex;
    position: fixed;
    right: 0;
    bottom: 44px;
    left: 0;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 90px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    line-height: 20px;
  }
  .price {
    margin-top: 12px;
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    text-align: center;
    width: 120px;
    height: 44px;
    line-height: 44px;
    background-color: red;
    color: #eeeeee;
  }
</style>
