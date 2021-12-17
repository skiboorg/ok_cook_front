<template>
  <q-layout view="lHh Lpr lFf">
      <Header/>
    <div class="container">

    <q-page-container>
      <router-view />
    </q-page-container>
    </div>
<q-separator class="q-mb-xl"/>
    <footer class="footer q-pb-lg gt-sm">
      <div class="container">
       <nav class="nav">
             <ul class="nav-wrapper">
               <li class="nav-item"><a class="nav-link" href="#feedback"  >О нас </a></li>
               <li class="nav-item"><a class="nav-link" href="#our_products"  >Продукция </a></li>
               <li class="nav-item"><a class="nav-link" href="#faq"  >Помощь </a></li>

               <li></li>
               <li></li>
               <li></li>
               <li></li>
                       <li class="nav-item"><a href="https://youtube.com/channel/UC74kJ9eS0RyP6ojX7PUaa5Q" target="_blank"><img class="icon" src="~assets/icons/yt.ico" alt=""></a></li>
               <li class="nav-item"><a href="https://www.facebook.com/profile.php?id=100076068011640" target="_blank"><img class="icon" src="~assets/icons/fb.ico" alt=""></a></li>
               <li class="nav-item"><a href="https://instagram.com/_ok_cook_?r=nametag" target="_blank"><img class="icon" src="~assets/icons/insta.ico" alt=""></a></li>
               <li class="nav-item"><a href="https://vm.tiktok.com/ZSePxdBX2/" target="_blank"><img class="icon" src="~assets/icons/tik.ico" alt=""></a></li>




             </ul>
           </nav>
      </div>

    </footer>
    <footer class="footer q-pb-lg lt-sm">
      <div class="container">
       <nav class="">
             <ul style="list-style: none" class="no-padding flex items-center justify-evenly">

               <li class="nav-item"><a href="https://youtube.com/channel/UC74kJ9eS0RyP6ojX7PUaa5Q" target="_blank"><img class="icon" src="~assets/icons/yt.ico" alt=""></a></li>
               <li class="nav-item"><a href="https://www.facebook.com/profile.php?id=100076068011640" target="_blank"><img class="icon" src="~assets/icons/fb.ico" alt=""></a></li>
               <li class="nav-item"><a href="https://instagram.com/_ok_cook_?r=nametag" target="_blank"><img class="icon" src="~assets/icons/insta.ico" alt=""></a></li>
               <li class="nav-item"><a href="https://vm.tiktok.com/ZSePxdBX2/" target="_blank"><img class="icon" src="~assets/icons/tik.ico" alt=""></a></li>




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
<style lang="sass">
.icon
  width: 30px
  height: 30px
  object-fit: contain
</style>
