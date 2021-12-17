<template>
  <q-page class="flex items-center justify-center">
       <div class="row q-col-gutter-lg full-width items-center">
          <div class="col-12 col-md-6">
            <q-img src="~assets/main_image.png"/>
          </div>
          <div class="col-12 col-md-6">
            <p class="text-primary text-h6 text-center">Выберите рацион</p>
            <div class="menu-buttons q-mb-lg">
              <q-btn unelevated push :size="$q.screen.lt.md ? 'md' : 'lg'"
                     v-for="(item,index) in complects"
                     :key="item.id"
                     class="full-width q-py-sm q-px-md q-py-md-sm q-px-md-xl q-mb-md"
                     color="secondary"
                     :to="`/ration/${item.id}`"
                     rounded
                     :label="`${item.name} ${item.is_unlimited ? '' : '(' + item.items_count + ' блюд)'}  `"/>
            </div>

          </div>
        </div>
  </q-page>
</template>
<script>

import {mapGetters} from "vuex";

export default {
  data(){
    return{

    }
  },
 computed:{
     ...mapGetters('data',['complects','session_id']),
 }
}
</script>
