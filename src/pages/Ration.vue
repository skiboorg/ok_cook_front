<template>
  <q-page class="relative-position">
<!--    <p>must_select_item: {{must_select_item}}</p>-->
<!--    <p>total_must_select_item: {{total_must_select_item}}</p>-->
<!--    <p>total_added: {{total_added}}</p>-->
<!--    <p>total_items_added: {{total_items_added}}</p>-->
    <div v-if="!complect.is_unlimited" class="items-counter">
      <q-card>
        <q-card-section class="q-pa-sm">
          <p class="no-margin text-caption ">Добавлено {{total_items_added}} из {{complect.items_count}} блюд</p>
          <p class="no-margin text-caption text-negative"
             v-if="total_must_select_item<must_select_item">Вы должны выбрать минимум {{must_select_item}}<br>блюда из затрака</p>
        </q-card-section>
      </q-card>

    </div>

    <h1 class="text-h4 text-bold text-primary">Рацион {{complect.name}}</h1>


    <div class="">
      <div v-for="(category,cat_index) in categories" :key="cat_index">
        <p class="text-h6 text-bold "> {{category.name}}</p>


        <carousel class="slider" :items-to-show="items_to_show" >

          <slide class="" :class="[$q.screen.lt.sm ? 'q-px-sm' : 'q-px-md']" v-for="(item,item_index) in category.items" :key="item_index">
            <q-card  class="full-width  bg-grey-2 q-mb-sm " :class="[$q.screen.lt.sm ? 'shadow-2' : ' shadow-3']">
              <q-card-section class="flex column items-center justify-center">
                <q-img :ratio="1" fit="contain" :src="item.image"/>
                <p class="q-mb-sm text-bold">{{item.name}}</p>
                <p class="q-mb-sm text-caption">Вес {{item.weigth}}</p>
                <p class="q-mb-sm text-caption">Калорий {{item.calories}}</p>
                <p class="q-mb-md text-caption text-bold">Цена {{item.price}} ₽</p>

                <div v-if="complect.show_items_amount">
                  <q-btn-group  push outline spread  rounded class="q-mb-lg ">
                    <q-btn :dense="$q.screen.lt.sm" :disable="!can_add_more || item.is_selected" @click="del_item_count(cat_index,item_index)" push color="primary" icon="remove" />
                    <q-btn :dense="$q.screen.lt.sm" :disable="!can_add_more || item.is_selected" color="white" text-color="secondary" class="text-bold "  :label="item.items_added" v-ripple="false" />
                    <q-btn :dense="$q.screen.lt.sm" :disable="!can_add_more || item.is_selected" @click="add_item_count(cat_index,item_index)" push color="primary"  icon="add" />
                  </q-btn-group>
                  <q-btn v-if="!item.is_selected " :loading="is_loading"
                         :disable="!can_add_more || item.items_added===0"
                         @click="selectItem(cat_index,item_index)"
                         label="Выбрать"
                         push
                         no-caps
                         class="full-width"
                         rounded
                         color="primary"/>
                  <q-btn v-if="item.is_selected" :loading="is_loading" class="full-width" @click="deselectItem(cat_index,item_index,item.id)" label="Отменить" push no-caps rounded color="negative"/>
                </div>
                <div v-else>
                  <q-btn v-if="!item.is_selected " :loading="is_loading"
                         :disable="!can_add_more"
                         @click="selectItem(cat_index,item_index)"
                         label="Выбрать"
                         push
                         no-caps
                         class="full-width"
                         rounded
                         color="primary"/>
                  <q-btn v-if="item.is_selected" :loading="is_loading" class="full-width" @click="deselectItem(cat_index,item_index,item.id)" label="Отменить" push no-caps rounded color="negative"/>

                </div>


              </q-card-section>
            </q-card>
          </slide>
          <template #addons>
            <navigation />
            <!--            <pagination />-->
          </template>
        </carousel>
      </div>
    </div>
    <div class="actions-bar " :class="{'bar-active':!can_add_more || show_bottom_buttons}">
      <div class="actions-bar--buttons">
        <q-btn label="Сбросить"
               @click="resetComplect"
               class="q-mb-md q-mb-sm-none"
               no-caps
               push
               :loading="is_loading"
               icon="remove_shopping_cart"
               color="negative"
               rounded/>
        <q-btn :label="total_must_select_item<must_select_item ? `Добавьте как минимум ${must_select_item} блюд из завтрака`  : 'Добавить в корзину'"
               @click="addToCart"
               class="q-mx-md q-mb-md q-mb-sm-none"
               no-caps
               :disable="total_must_select_item<must_select_item"
               :loading="is_loading"
               push
               icon="add_shopping_cart"
               color="positive"
               rounded/>
        <q-btn v-if="is_added_to_cart"
               label="Оплата"
               no-caps
               :loading="is_loading"
               to="/checkout"
               push
               icon="shopping_cart_checkout"
               color="secondary"
               rounded/>


      </div>

    </div>
  </q-page>
</template>
<script>

import {mapActions, mapGetters} from "vuex";
import {api} from "boot/axios";

export default {
  async preFetch ({ store, currentRoute, redirect}) {
    await store.dispatch('data/fetchComplect',currentRoute.params.ration_id)
    if (!store.state.data.complect.id){
      redirect({ path: '/404' })
    }
  },
  data(){
    return{
      total_items_added:0,
      show_bottom_buttons:false,
      is_added_to_cart:false,
      is_loading:false,
      can_add_more:true,
      categories:[],
      total_added: 0,
      amout_total_added: 0,
      complect_items:[],
      complect_uid:null,
      must_select_item:0,
      total_must_select_item:0
    }
  },
  async beforeMount() {
    await this.getCategories()
    this.complect_uid = this.createUID()
    if(!this.complect.is_unlimited){
      this.must_select_item = parseInt(parseInt(this.complect.items_count) / 5)
    }

  },
  methods:{
    ...mapActions('data',['fetchCart']),
    add_item_count(cat_index, item_index){

      if(!this.complect.is_unlimited){
        if(this.complect.items_count > this.amout_total_added){
          this.categories[cat_index].items[item_index].items_added += 1
          this.amout_total_added += 1
        }
      }else{
        this.categories[cat_index].items[item_index].items_added += 1
        this.amout_total_added += 1
      }


    },
    del_item_count(cat_index, item_index){
      if (this.categories[cat_index].items[item_index].items_added>0){
        this.categories[cat_index].items[item_index].items_added -= 1
        this.amout_total_added -= 1
      }
    },
    async addToCart(){
      this.is_loading = !this.is_loading
      const response = await this.$api.post('/api/cart/add',{
        complect_id:this.complect.id,
        complect_uid:this.complect_uid,
        complect_items:this.complect_items,
        session_id:this.session_id

      })
      this.is_added_to_cart = true
      this.$q.notify({
        message: `Рацион добавлен в корзину<br>Вы можете добавить такой же снова<br>или изменить состав`,
        position: this.$q.screen.lt.sm ? 'top' : 'bottom-right',
        color:'positive',
        html:true,
        icon: 'add_shopping_cart'
      })
      await this.fetchCart()
      this.is_loading = !this.is_loading
    },
    createUID(){
      return  Date.now().toString(36) + Math.random().toString(36).substring(2)
    },
    async getCategories(){
      const response = await api.get( '/api/data/category')
      this.categories = response.data
    },
    selectItem(cat_index, item_index){
      if(!this.complect.is_unlimited){
        if(this.complect.items_count > this.total_added){
          if(this.categories[cat_index].must_check_one_item){

            if(this.complect.show_items_amount){
              this.total_must_select_item += this.categories[cat_index].items[item_index].items_added
            }else{
              this.total_must_select_item +=1
            }

          }
          if(this.complect.show_items_amount){
            this.total_added += this.categories[cat_index].items[item_index].items_added
            this.total_items_added += this.categories[cat_index].items[item_index].items_added
          }else{
            this.total_added += 1
            this.total_items_added += 1
            this.categories[cat_index].items[item_index].items_added = 1
          }
          this.categories[cat_index].items[item_index].is_selected = true


          this.complect_items.push(this.categories[cat_index].items[item_index])
          this.can_add_more = this.complect.items_count >= this.total_added + 1
        }else {
          this.can_add_more = false
        }
      }else{
        if(this.categories[cat_index].must_check_one_item){
          this.total_must_select_item += this.categories[cat_index].items[item_index].items_added
        }


        this.total_added += this.categories[cat_index].items[item_index].items_added
        this.total_items_added += this.categories[cat_index].items[item_index].items_added
        this.categories[cat_index].items[item_index].is_selected = true
        this.complect_items.push(this.categories[cat_index].items[item_index])
      }

    },
    deselectItem(cat_index, item_index,item_id){
      if(!this.complect.is_unlimited){
         if(this.categories[cat_index].must_check_one_item){
        if(this.complect.show_items_amount){
          this.total_must_select_item -= this.categories[cat_index].items[item_index].items_added
        }else{
          this.total_must_select_item -=1
        }
      }
      this.categories[cat_index].items[item_index].is_selected = false
      //this.categories[cat_index].items[item_index].items_added = 0

      if(this.complect.show_items_amount){
        this.total_added -= this.categories[cat_index].items[item_index].items_added
        this.total_items_added -= this.categories[cat_index].items[item_index].items_added
        this.amout_total_added -= this.categories[cat_index].items[item_index].items_added
      }else{
        this.total_added -= 1
        this.total_items_added -= 1
      }

      this.categories[cat_index].items[item_index].items_added = 0
      console.log(this.complect_items.findIndex(x=>x.id===item_id))
      this.complect_items.splice(this.complect_items.findIndex(x=>x.id===item_id),1)
      this.can_add_more = true
      }else {
        if(this.categories[cat_index].must_check_one_item){
          this.total_must_select_item -= this.categories[cat_index].items[item_index].items_added
        }
        this.categories[cat_index].items[item_index].is_selected = false
        this.total_added -= this.categories[cat_index].items[item_index].items_added
        this.total_items_added -= this.categories[cat_index].items[item_index].items_added
        this.amout_total_added -= this.categories[cat_index].items[item_index].items_added
        this.categories[cat_index].items[item_index].items_added = 0
        this.complect_items.splice(this.complect_items.findIndex(x=>x.id===item_id),1)
      }


    },
    async resetComplect(){
      let cat,item
      this.amout_total_added = 0
      this.total_must_select_item = 0
      for(let i of this.complect_items){
        cat = this.categories.find(x=>x.id===i.category)
        item = cat.items.find(x=>x.id===i.id)
        item.is_selected = false
        item.items_added = 0
      }
      this.can_add_more = true
      this.total_added = 0
      this.total_items_added -= this.complect.items_count
      this.complect_items = []
      this.show_bottom_buttons = false
      console.log(this.categories)
    }
  },
  watch:{
    can_add_more(val){
      val ? this.complect_uid = this.createUID() : null
    },
    show_bottom_buttons(val){
      val ? this.complect_uid = this.createUID() : null
    },
    total_added(val){
       if(this.complect.is_unlimited){
         if(val>0){
           this.must_select_item = parseInt(val/5)
           this.show_bottom_buttons = true
         }else{
           this.show_bottom_buttons = false
         }

       }
    }

  },
  computed:{
    ...mapGetters('data',['complect','session_id']),
    items_to_show(){
      let items
      this.$q.screen.lt.sm ? items = 2 : items = 5
      return items
    },


  }
}
</script>
<style lang="sass">
.slider
  margin-bottom: 20px !important
//.carousel__viewport
//  height: 230px
.carousel__prev, .carousel__next
  background: $primary !important
.actions-bar
  position: fixed
  bottom: 0
  backdrop-filter: blur(7px)
  background-color: #0000001a
  left: 0
  right: 0
  padding: 15px 0
  text-align: center
  transition: all .2s linear
  opacity: 0
  pointer-events: none
  &.bar-active
    opacity: 1
    pointer-events: all

.items-counter
  position: fixed
  right: 20px
  top: 140px
  z-index: 100
</style>
