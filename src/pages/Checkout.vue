<template>
  <q-page>
 <div v-if="cart.complects.length>0" class="row q-mt-lg">
          <div class="col-12 col-md-6 q-mb-lg q-mb-md-none">
            <AuthForm v-if="!$auth.loggedIn" :redirect="false"/>
            <div v-else class="">
               <p class="text-h6 no-margin">Информация о доставке</p>
                 <q-stepper
                       v-model="checkout_step"
                       vertical
                       flat
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
                <q-input dense class="q-mb-md" outlined v-model="orderData.delivery_address"/>
                <p>Время доставки</p>
                <q-option-group
                  :options="deliveryTime"
                  class="q-mb-md"
                  type="radio"
                  dense
                  v-model="orderData.delivery_time"
                />
                <q-stepper-navigation>
                  <q-btn no-caps :disable="!orderData.delivery_address " @click="checkout_step=2" rounded push color="primary" label="Далее" />

                </q-stepper-navigation>
              </q-step>
              <q-step
                :name="2"
                title="Покупатель"
                icon="contact_mail"
                :done="checkout_step > 2">

                <q-form v-if="orderData.user_type==='fiz'">
                  <p class="q-mb-sm">E-Mail*</p>
                  <q-input class="q-mb-sm" readonly dense outlined v-model="orderData.email"/>
                  <p class="q-mb-sm">Телефон*</p>
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
                  <q-input class="q-mb-sm" type="textarea" dense outlined v-model="orderData.comment"/>
                </q-form>
              </q-step>


            </q-stepper>
            </div>

          </div>
          <div class="col-12 col-md-5 offset-0 offset-md-1">
            <p class="text-h6">Товары в заказе</p>
             <q-list v-if="cart.complects.length>0" >
                <q-expansion-item
                  group="cart_group"
                   expand-separator
                  :label="complect.complect.name"
                  v-for="(complect,index) in cart.complects">
                  <template v-slot:header>
                    <q-item-section>
                          <q-item-label>Рацион {{complect.complect.name}}</q-item-label>
                        <q-item-label caption>{{complect.amount}} шт. x {{complect.price}} ₽ = {{complect.amount * complect.price}} ₽</q-item-label>
                    </q-item-section>
                  </template>
                  <q-list dense >
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

              </q-list>
            <p class="text-negative text-body2">Внимание, заказ доставляется на следующий день!<br>После 19:00 заказ доставляется через день.</p>
            <div class="text-right q-py-md">

                  <q-btn v-if="$auth.loggedIn"
                         :disable="checkout_step!==2 || !orderData.phone"
                         no-caps :class="{'full-width':$q.screen.lt.sm}"
                         rounded push :loading="is_loading"
                         color="primary"
                         @click="createOrder"
                         label="Оплата заказа" />

            </div>

          </div>
        </div>
    <div v-else style="height: 88vh" class="flex column items-center justify-center">
      <p class="text-h4 text-bold text-primary q-mb-lg">Корзина пуста</p>
       <q-btn to="/rations" no-caps unelevated push size="lg" class=" q-py-sm q-px-xl" color="secondary" rounded label="Выбрать блюда"/>
    </div>
  </q-page>
</template>
<script>

import {mapActions, mapGetters} from "vuex";
import {api} from "boot/axios";
import AuthForm from "components/AuthForm";

export default {
  components: {AuthForm},
  data(){
    return{

      is_loading:false,
      checkout_step:1,


       userType: [
        { label: 'Физическое лицо', value: 'fiz' },
        { label: 'Юридическое лицо', value: 'ur' },
      ],
      deliveryTime: [
        { label: 'с 9:00 до 15:00', value: 'с 9:00 до 15:00' },
        { label: 'с 15:00 до 21:00', value: 'с 15:00 до 21:00' },
      ],
      orderData:{
        user_type: this.$auth.user.is_company ? 'ur' : 'fiz',
        delivery_time:'с 9:00 до 15:00',
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


  methods:{
     ...mapActions('data',['fetchCart']),
    async createOrder(){
      this.is_loading = !this.is_loading
      const response = await this.$api.post('/api/order/create',{order_data:this.orderData})
      console.log(response.data)
      await this.fetchCart()
      window.location.href = response.data.url
      this.order_code = response.data.code
      this.is_order_done = true
      this.is_loading = !this.is_loading
    },

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
