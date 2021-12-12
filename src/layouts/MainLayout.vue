<template>
  <q-layout view="lHh Lpr lFf">
      <Header/>
    <div class="container">

    <q-page-container>
      <router-view />
    </q-page-container>
    </div>
    <footer class="footer q-pb-lg gt-sm">
      <div class="container">
       <nav class="nav">
             <ul class="nav-wrapper">
               <li class="nav-item"><a class="nav-link" href="#feedback"  >О нас </a></li>
               <li class="nav-item"><a class="nav-link" href="#our_products"  >Продукция </a></li>
               <li class="nav-item"><a class="nav-link" href="#faq"  >Помощь </a></li>

               <li></li>
               <li></li>
               <li class="nav-item"><router-link class="nav-link" to="/">Оформить заказ</router-link></li>
               <li class="nav-item"><router-link class="nav-link" to="/">Выйти</router-link></li>

             </ul>
           </nav>
      </div>

    </footer>
    <q-page-scroller position="bottom-right" class="z-top" :scroll-offset="250" :offset="[20, 20]">
        <q-btn fab  icon="keyboard_arrow_up" color="secondary" />
      </q-page-scroller>
  </q-layout>
</template>


<script>
import Header from "components/Header";
export default {
  components: {Header},
  data(){
    return{
      tab:'index'
    }
  },

}
</script>
