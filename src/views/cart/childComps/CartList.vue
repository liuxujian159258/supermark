<template>
    <div class="cart-list">
      <CartListItem v-for="(item, index) in cartList" :product="item" :key="index"></CartListItem>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CartListItem from './CartListItem'

export default {
  name: 'CartList',
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px);
  }
</style>
