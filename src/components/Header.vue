<template>
   <q-header reveal  :reveal-offset="50" height-hint="150" class="bg-grey-2 q-py-md">
     <div class="container">
         <q-toolbar class="flex items-center justify-between">
        <q-btn
          flat
          dense
          round
          class="lt-md"
          icon="menu"
          aria-label="Menu"
          @click="menuOpen=true"
        />
        <router-link to="/">
          <img class="logo" src="~assets/logo.png" alt="">
        </router-link>
           <nav class="nav">
             <ul class="nav-wrapper">
               <li class="nav-item"><a class="nav-link" href="#feedback"  >О нас </a></li>
               <li class="nav-item"><a class="nav-link" href="#our_products"  >Продукция </a></li>
               <li class="nav-item"><a class="nav-link" href="#faq"  >Помощь </a></li>

               <li></li>
               <li></li>
               <li class="nav-item"><router-link class="nav-link" to="/menu">Оформить заказ</router-link></li>
               <li v-if="$auth.loggedIn" class="nav-item"><router-link class="nav-link" to="/lk">ЛК</router-link></li>
               <li v-if="$auth.loggedIn" class="nav-item"><a class="nav-link " href="#" @click.prevent="logoutUserAction">Выйти</a></li>

               <li v-else class="nav-item"><router-link class="nav-link" to="/auth">Войти</router-link></li>

             </ul>
           </nav>


      </q-toolbar>


     </div>
        </q-header>
    <q-drawer
      v-model="menuOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>


      </q-list>
    </q-drawer>
</template>
<script>
import { scroll } from 'quasar'
import {mapActions} from "vuex";
const { getScrollTarget, setScrollPosition } = scroll
export default {
  data(){
    return {
      menuOpen: false,
      tab:'index'


    }
  },
  methods:{
   ...mapActions('auth',['logoutUser']),
    async logoutUserAction(){
      document.cookie = 'auth_token' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      await this.$api.post('/auth/token/logout/')
      this.$api.defaults.headers.common['Authorization'] = null
      console.log(this.$api.defaults.headers.common)
      // window.location.href='/'
      this.logoutUser()
      await this.$router.push('/')
    }
  }
}
</script>
<style lang="sass">
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
</style>
