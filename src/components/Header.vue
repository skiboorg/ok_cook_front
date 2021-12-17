<template>
  <q-header reveal elevated :reveal-offset="50" height-hint="150" class="bg-grey-2 q-py-md">
    <div class="container">
      <q-toolbar class="flex items-center justify-between">

        <router-link to="/">
          <img class="logo" src="~assets/logo.png" alt="">
        </router-link>
        <nav class="nav gt-sm">
          <ul class="nav-wrapper">
            <li class="nav-item"><a class="nav-link" href="#feedback"  >О нас </a></li>
            <li class="nav-item"><a class="nav-link" href="#our_products"  >Продукция </a></li>
            <li class="nav-item"><a class="nav-link" href="#faq"  >Помощь </a></li>

            <li></li>
            <li></li>
            <li class="nav-item"><router-link class="nav-link" to="/rations">Оформить заказ</router-link></li>
            <li v-if="$auth.loggedIn" class="nav-item"><router-link class="nav-link" to="/lk">ЛК</router-link></li>
            <li v-if="$auth.loggedIn" class="nav-item"><a class="nav-link " href="#" @click.prevent="logoutUserAction">Выйти</a></li>
            <li v-else class="nav-item"><router-link class="nav-link" to="/auth">Войти</router-link></li>
          </ul>
        </nav>
        <div class="flex items-center no-wrap">

          <div class="relative-position q-mr-md q-mr-md-none">
            <q-badge style="top: -20px" v-if="cart.complects.length>0"
                     :color="cart.items_count < 25 ? 'negative' : 'positive'"
                     class="z-top"
                     floating>
              <q-icon class="q-mr-xs" name="local_shipping"/>
              {{cart.items_count < 25 ? 'Платная доставка' : 'Бесплатная доставка'}}

            </q-badge>
            <q-btn-dropdown  outline color="white" :label="cart.complects.length > 0 ? `${total_price_cart} ₽` : ''"  text-color="dark" icon="shopping_cart">
            <div v-if="cart.complects.length>0" class="relative-position">
               <q-list  >
                  <q-inner-loading class="z-max" :showing="is_loading">
         <q-spinner-puff
          color="primary"
          size="2em"
        />
      </q-inner-loading>
                <q-expansion-item
                  group="cart_group"
                   expand-icon-toggle
                    expand-separator
                  :label="complect.complect.name"
                  v-for="(complect,index) in cart.complects">
                  <template v-slot:header>
                    <q-item-section>
                          <q-item-label>Рацион {{complect.complect.name}}</q-item-label>
                        <q-item-label caption>{{complect.amount}} шт. x {{complect.price}} ₽ = {{complect.amount * complect.price}} ₽</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn @click="removeComplect(complect.id)" flat icon="delete" color="white" text-color="negative" dense round/>
                    </q-item-section>
                  </template>
                  <q-list dense>
                    <q-item dense v-for="item in complect.items">
                      <q-item-section avatar>
                        <q-avatar size="50px">
                          <img :src="item.item.image" alt="">
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{item.item.name}}</q-item-label>
                        <q-item-label caption>{{item.amount}} шт. x {{item.item.price}} ₽ = {{item.price}} ₽</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-expansion-item>
                <q-separator class="q-mt-sm"/>

                <div class=" q-pa-md">
                  <div v-if="cart.items_count < 25" class="flex items-center justify-between">
                    <p class="no-margin  ">В корзине</p>
                  <p class="no-margin  ">{{cart.price}} ₽</p>
                  </div>
                  <div v-if="cart.items_count < 25" class="flex items-center justify-between">
                    <p class="no-margin  ">Доставка</p>
                  <p class="no-margin  ">1000 ₽</p>
                  </div>
                  <div class="flex items-center justify-between">
                    <p class="no-margin text-primary text-bold">Итого</p>
                  <p class="no-margin text-primary text-bold">{{total_price_cart}} ₽</p>
                  </div>

                </div>
              <q-separator />
                <div class="q-pa-md">
                        <q-btn
               label="Оплата"
               to="/checkout"
               no-caps
               class="full-width "
               push
               icon="shopping_cart_checkout"
               color="secondary"
               rounded/>
                </div>
              </q-list>
            </div>

              <div v-else class="">
                <p class="no-margin text-bold text-primary q-pa-md">Корзина пуста</p>
              </div>
            </q-btn-dropdown>
          </div>

          <q-btn
            flat
            dense
            round
            text-color="dark"
            class="lt-md"
            icon="menu"
            aria-label="Menu"
            @click="menuOpen=true"
          />

        </div>



      </q-toolbar>


    </div>
  </q-header>
  <q-drawer
    v-model="menuOpen"
    bordered
    side="right"
  >
    <ul class="mobile-nav-wrapper">
      <li class="nav-item q-mb-md"><a class="nav-link block" href="#feedback"  >О нас </a></li>
      <li class="nav-item q-mb-md"><a class="nav-link block" href="#our_products"  >Продукция </a></li>
      <li class="nav-item q-mb-lg"><a class="nav-link block" href="#faq"  >Помощь </a></li>

      <li class="nav-item q-mb-md"><router-link class="nav-link" to="/menu">Оформить заказ</router-link></li>
      <li v-if="$auth.loggedIn" class="nav-item q-mb-md"><router-link class="nav-link" to="/lk">ЛК</router-link></li>
      <li v-if="$auth.loggedIn" class="nav-item q-mb-md"><a class="nav-link " href="#" @click.prevent="logoutUserAction">Выйти</a></li>

      <li v-else class="nav-item q-mb-md"><router-link class="nav-link" to="/auth">Войти</router-link></li>

    </ul>
  </q-drawer>
</template>
<script>
import { scroll } from 'quasar'
import {mapActions, mapGetters} from "vuex";
const { getScrollTarget, setScrollPosition } = scroll
export default {
  data(){
    return {
      menuOpen: false,
      is_loading: false,
      tab:'index'


    }
  },

  methods:{
    ...mapActions('auth',['logoutUser']),
    ...mapActions('data',['fetchCart']),
    async removeComplect(id){
      this.is_loading = !this.is_loading
      await this.$api.post('/api/cart/remove',{id,session_id:this.session_id})
      await this.fetchCart()
      this.is_loading = !this.is_loading
    },
    async logoutUserAction(){
      document.cookie = 'auth_token' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      await this.$api.post('/auth/token/logout/')
      this.$api.defaults.headers.common['Authorization'] = null
      console.log(this.$api.defaults.headers.common)
      // window.location.href='/'
      this.logoutUser()
      await this.$router.push('/')
    }
  },
  computed:{
    ...mapGetters('data',['cart','session_id']),
    total_price_cart(){
      if (this.cart.items_count < 25){
        return this.cart.price + 1000
      }else {
        return this.cart.price
      }

    }
  }
}
</script>
<style lang="sass">
.mobile-nav-wrapper
  list-style: none
.nav
  flex-grow: 1
  &-wrapper
    list-style: none
    display: flex
    align-items: center
    justify-content: space-evenly
  &-link
    color: $dark
    font-size: 18px
    text-transform: none
.logo
  width: 200px
  height: 75px
  object-fit: contain
.q-tab
  &__label
    color: $dark
    font-size: 18px
    text-transform: none
  &.q-hoverable:hover > .q-focus-helper
    background: $grey-2 !important
    opacity: 0
@media (max-width: 768px)
  .logo
    width: 110px
    height: 41px
</style>
