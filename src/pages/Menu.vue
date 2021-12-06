<template>
  <q-page  :class="{'flex column items-center justify-center':is_order_done}">

    <q-stepper
      v-if="!is_order_done"
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      flat

      :vertical="$q.screen.lt.md"
      class="bg-grey-2"
      done-color="positive"
      active-color="secondary"
    >
      <q-step
        :name="1"
        title="Выберете меню"
        icon="looks_one"
        :done="step > 1"
      >
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-6">
            <q-img src="~assets/main_image.png"/>
          </div>
          <div class="col-12 col-md-6">
            <p class="text-primary text-h6 text-center">Меню на неделю</p>
            <div class="menu-buttons q-mb-lg">
              <q-btn unelevated push :size="$q.screen.lt.md ? 'md' : 'lg'"
                     v-for="(item,index) in menu_type"
                     @click="menuTypeSelected(item.id,index)"
                     :key="item.id"
                     class="full-width q-py-sm q-px-md q-py-md-sm q-px-md-xl q-mb-md"
                     color="secondary" rounded :label="`${item.items_count} блюд (${item.items_gift_count} в подарок)`"/>
            </div>
            <q-btn unelevated
                   push
                   :size="$q.screen.lt.md ? 'md' : 'xl'"
                   class="full-width q-py-sm q-px-md q-py-md-sm q-px-md-xl q-mb-md"
                   color="primary"
                   :disable="current_menu_type_index === null"
                   @click="step=2"
                   rounded :label="`Сумма заказа ${menu_price} / Далее`"/>
          </div>
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Соберите заказ"
        icon="looks_two"
        :done="step > 2"
      >
        <div class="">
          <q-tabs
            v-model="category_tab"
            dense
            class="text-grey "
            active-color="primary"
            indicator-color="primary"
            align="justify"
            swipeable
            mobile-arrows
            narrow-indicator
          >
            <q-tab :name="index" :label="category.name" v-for="(category,index) in categories" :key="index" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="category_tab" animated swipeable infinite>
            <q-tab-panel :name="cat_index" v-for="(category,cat_index) in categories" :key="cat_index" class="bg-grey-2">
              <div class="items-grid">
                <div class="item text-center" v-for="(item,item_index) in category.items" :key="item_index">
                  <q-img fit="contain" :ratio="1" :src="item.image"/>
                  <p class="q-mb-sm text-bold">{{item.name}}</p>
                  <p class="q-mb-sm text-caption">Вес {{item.weigth}}</p>
                  <p class="q-mb-md text-caption">Калорий {{item.calories}}</p>

                  <q-btn-group v-if="!item.is_selected && !can_add_more" push outline spread  rounded class="q-mb-lg ">
                    <q-btn @click="del_item_count(cat_index,item_index)" push color="secondary" icon="remove" />
                    <q-btn  color="white" text-color="primary" class="text-bold "  :label="item.items_added" v-ripple="false" />
                    <q-btn @click="add_item_count(cat_index,item_index)" push color="secondary"  icon="add" />
                  </q-btn-group>
                  <div v-if="!item.is_selected && !can_add_more" class="">
                    <q-btn @click="selectItem(cat_index,item_index)" :disable="item.items_added === 0"  label="Выбрать" class="full-width text-bold q-py-sm" color="secondary" push rounded/>
                  </div>
                  <div v-if="item.is_selected ">
                    <q-btn @click="deselectItem(cat_index,item_index,item.id)" size="md" label="Отменить" class="full-width text-bold" color="negative" push rounded/>
                  </div>
                  <p class="q-mb-none q-pa-md text-caption text-negative bg-grey-3" v-if="can_add_more && !item.is_selected">Максимальное количество блюд. Выберете другой план</p>



                </div>
              </div>
            </q-tab-panel>


          </q-tab-panels>
        </div>
      </q-step>

      <q-step
        :name="3"
        title="Оформите заказ"
        icon="looks_3"
      >
        <div class="row">
          <div class="col-12 col-md-6">
            <AuthForm v-if="!$auth.loggedIn" :redirect="false"/>
            <q-stepper v-else
                       v-model="checkout_step"
                       vertical
                       done-color="positive"
                        active-color="secondary"
                       class="bg-grey-2"
                       animated
            >
              <q-step
                :name="1"
                title="Регион доставки"
                icon="person"
                :done="checkout_step > 1"
              >
                <p>Тип плательщика</p>
                <q-option-group
                  :options="userType"
                  class="q-mb-md"
                  type="radio"
                  dense
                  v-model="orderData.user_type"
                />
                <p>Местоположение</p>
                <q-input dense outlined v-model="orderData.delivery_address"/>
                <q-stepper-navigation>
                  <q-btn no-caps :disable="!orderData.delivery_address" @click="checkout_step=2" rounded push color="primary" label="Далее" />

                </q-stepper-navigation>
              </q-step>
              <q-step
                :name="2"
                title="Покупатель"
                icon="contact_mail"
                :done="checkout_step > 2">

                <q-form v-if="orderData.user_type==='fiz'">
                  <p class="q-mb-sm">E-Mail</p>
                  <q-input class="q-mb-sm" readonly dense outlined v-model="orderData.email"/>
                  <p class="q-mb-sm">Телефон</p>
                  <q-input class="q-mb-sm" dense outlined v-model="orderData.phone"/>
                  <p class="q-mb-sm">Комментарии к заказу</p>
                  <q-input class="q-mb-sm" dense outlined v-model="orderData.comment"/>
                </q-form>
                <q-form v-if="orderData.user_type==='ur'">
                  <p class="q-mb-sm">Название компании</p>
                  <q-input class="q-mb-sm" dense outlined v-model="orderData.company_name"/>
                  <p class="q-mb-sm">Юридический адрес</p>
                  <q-input class="q-mb-sm" dense outlined v-model="orderData.company_address"/>
                  <p class="q-mb-sm">ИНН</p>
                  <q-input class="q-mb-sm" dense outlined v-model="orderData.company_inn"/>
                  <p class="q-mb-sm">КПП</p>
                  <q-input class="q-mb-sm" dense outlined v-model="orderData.company_kpp"/>
                  <p class="q-mb-sm">Контактное лицо</p>
                  <q-input class="q-mb-sm" dense outlined v-model="orderData.company_contact"/>
                  <p class="q-mb-sm">E-Mail</p>
                  <q-input class="q-mb-sm" readonly dense outlined v-model="orderData.email"/>
                  <p class="q-mb-sm">Телефон</p>
                  <q-input class="q-mb-sm" dense outlined v-model="orderData.phone"/>
                  <p class="q-mb-sm">Комментарии к заказу</p>
                  <q-input class="q-mb-sm" dense outlined v-model="orderData.comment"/>
                </q-form>

                <q-stepper-navigation>
                  <q-btn no-caps rounded push :loading="is_loading" color="primary" @click="createOrder" label="Оплата заказа" />

                </q-stepper-navigation>
              </q-step>


            </q-stepper>
          </div>
          <div class="col-12 col-md-5 offset-0 offset-md-1">
            <p class="text-h5">Товары в заказе</p>
            <q-list class="q-mb-md" >
              <q-item v-for="item in cart" :key="item.id">
                <q-item-section avatar>
                  <q-avatar rounded>
                    <img :src="item.image">
                  </q-avatar>
                </q-item-section>
                <q-item-section>{{item.name}} x {{item.items_added}}шт<br>Вес: {{item.weigth}} Калорий: {{item.calories}}</q-item-section>
              </q-item>
            </q-list>
            <q-separator class="q-mb-md"/>
            <p class="q-mb-lg text-h5">Сумма заказа {{menu_type[current_menu_type_index].price}} ₽</p>

             <q-btn :loading="is_loading" color="secondary" push rounded @click="resetCart" label="Изменить заказ" class="q-ml-sm" />
          </div>
        </div>


      </q-step>



      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-if="step === 2"  color="secondary" push rounded @click="$refs.stepper.previous()" label="Изменить тип меню" class="q-ml-sm" />
          <q-btn v-if="step === 2" :disable="!can_add_more" :loading="is_loading" color="primary" push rounded @click="addToCart" label="Оформить" class="q-ml-sm" />

        </q-stepper-navigation>
      </template>
    </q-stepper>
    <div v-else class="text-center">
      <h3 class="text-h5">Ваш заказ успешно создан</h3>
      <h3 class="text-h5">Номер заказа : <span class="text-primary">{{order_code}}</span></h3>
    </div>
  </q-page>
</template>

<script>

import {mapGetters} from "vuex";
import {api} from "boot/axios";
import AuthForm from "components/AuthForm";

export default {
  components: {AuthForm},
  data(){
    return{
      order_code:'dsfsdf',
      is_order_done:false,
      is_loading:false,
      step:1,
      checkout_step:1,
      current_menu_type_id:null,
      current_menu_type_index:null,
      category_tab: 0,
      total_added: 0,
      in_cart: 0,
      cart:[],
      categories:[],
       userType: [
        { label: 'Физическое лицо', value: 'fiz' },
        { label: 'Юридическое лицо', value: 'ur' },
      ],
      orderData:{
        user_type:'fiz',
        delivery_address:this.$auth.user.address,
        email:this.$auth.user.email,
        phone:this.$auth.user.phone,
        city:this.$auth.user.city,
        comment:null,
        company_name:this.$auth.user.company_name,
        company_address:this.$auth.user.company_address,
        company_inn:this.$auth.user.company_inn,
        company_kpp:this.$auth.user.company_kpp,
        company_contact:this.$auth.user.company_contact,

      }
    }
  },
  async beforeMount(){
    await this.getCategories()
    await this.$api.post('/api/cart/erase',{session_id:this.session_id})
  },
  watch:{
    async step(val){
      console.log(val)
      if(val===1){
        this.current_menu_type_id = null
        this.current_menu_type_index = null
        this.category_tab = 0
        this.total_added = 0
        this.in_cart =0
        this.cart=[]
        await this.getCategories()
      }
    }
  },
  methods:{
    async createOrder(){
      this.is_loading = !this.is_loading
      const response = await this.$api.post('/api/order/create',{menu_type_id:this.current_menu_type_id,order_data:this.orderData})
      console.log(response.data)
      this.order_code = response.data.code
      this.is_order_done = true
      this.is_loading = !this.is_loading
    },
    async addToCart(){
      this.is_loading = !this.is_loading
      await this.$api.post('/api/cart/add',{session_id:this.session_id,cart:this.cart})
      this.is_loading = !this.is_loading
      this.$refs.stepper.next()
    },
    async resetCart(){
      this.is_loading = !this.is_loading
      await this.$api.post('/api/cart/erase',{session_id:this.session_id})
      this.is_loading = !this.is_loading
      this.$refs.stepper.previous()
      this.checkout_step = 1
    },
    async getCategories(){
      const response = await api.get( '/api/data/category')
      this.categories = response.data
    },
    menuTypeSelected(id,index){
      this.current_menu_type_id = id
      this.current_menu_type_index = index
    },
    add_item_count(cat_index, item_index){
      // const total_avaiable_to_add = this.menu_type[this.current_menu_type_index].items_count + this.menu_type[this.current_menu_type_index].items_gift_count
      console.log('total_avaiable_to_add',this.total_avaiable_to_add)
      console.log(this.categories[cat_index].items[item_index])
      console.log('total_added',this.total_added)

      if(this.total_added < this.total_avaiable_to_add){
        this.categories[cat_index].items[item_index].items_added += 1
        this.total_added += 1
      }
    },
    del_item_count(cat_index, item_index){
      // const total_avaiable_to_add = this.menu_type[this.current_menu_type_index].items_count + this.menu_type[this.current_menu_type_index].items_gift_count
      console.log('total_avaiable_to_add',this.total_avaiable_to_add)
      console.log(this.categories[cat_index].items[item_index])
      console.log('total_added',this.total_added)
      if (this.categories[cat_index].items[item_index].items_added>0){
        this.categories[cat_index].items[item_index].items_added -= 1
        this.total_added -= 1
      }
    },
    selectItem(cat_index, item_index){
      this.categories[cat_index].items[item_index].is_selected = true
      this.in_cart += this.categories[cat_index].items[item_index].items_added
      this.cart.push(this.categories[cat_index].items[item_index])
    },
    deselectItem(cat_index, item_index,item_id){
      this.categories[cat_index].items[item_index].is_selected = false
      this.in_cart -= this.categories[cat_index].items[item_index].items_added
      this.cart.splice(this.cart.findIndex(x=>x.id===item_id),1)

    },
  },
  computed:{
    ...mapGetters('data',['menu_type','session_id']),
    menu_price(){
      if (this.current_menu_type_index !== null){
        return this.menu_type[this.current_menu_type_index].price
      }
      else {
        return ''
      }
    },
    total_avaiable_to_add(){
      return this.menu_type[this.current_menu_type_index].items_count + this.menu_type[this.current_menu_type_index].items_gift_count
    },
    can_add_more(){
      return this.total_avaiable_to_add === this.in_cart
    }
  }

}
</script>
<style lang="sass">
.items-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
  grid-gap: 20px
</style>
