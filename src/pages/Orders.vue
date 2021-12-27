<template>
  <q-page>
  <div v-if="in_work_orders.length > 0" class="q-py-lg">
    <p>Отметить все заказы обработанным и выгрузить в pdf</p>
    <q-btn v-if="!sklad_filename" @click="orderDone(0,'all')" color="positive" push no-caps rounded label="Выполнить"/>
    <a v-if="sklad_filename" class="link text-bold text-positive" :href="sklad_filename" target="_blank">Скачать PDF для склада</a><br><br>
    <a v-if="sklad_filename" class="link text-bold text-positive" :href="transport_filename" target="_blank">Скачать PDF для логистики</a><br><br>
    <a v-if="sklad_filename" class="link text-bold text-positive" :href="calc_filename" target="_blank">Скачать сводный PDF</a>
  </div>
  <q-tabs
      v-model="tab"
      dense
      class="text-grey "
      active-color="primary"
      indicator-color="primary"
      align="justify"
       swipeable
            mobile-arrows
            outside-arrows
    >
      <q-tab name="in_work" label="Необработанные заказы" />
      <q-tab name="done" label="Обработанные заказы" />

    </q-tabs>
     <q-tab-panels swipeable v-model="tab" animated class="bg-grey-2">
      <q-tab-panel name="in_work">
          <q-list separator>
          <q-item class="q-py-md">
            <q-item-section   class=" text-bold text-dark text-caption">ID заказа</q-item-section>
            <q-item-section class="text-bold text-dark text-caption">Код<br>заказа</q-item-section>
            <q-item-section class="text-bold text-dark text-caption">Сумма<br>заказа</q-item-section>
            <q-item-section class="text-bold text-dark text-caption">Стоимость<br>доставки</q-item-section>
            <q-item-section class="text-bold text-dark text-caption">Время<br>доставки</q-item-section>
            <q-item-section class="text-bold text-dark text-caption">Дата<br>заказа</q-item-section>



          </q-item>
          <q-expansion-item
            group="group"
            label="First"
            expand-separator
            header-class="q-py-md"
            v-for="order in in_work_orders"
            :key="order.id"
          >
            <template v-slot:header >
              <q-item-section  class=" text-caption">{{order.id}}</q-item-section>
              <q-item-section  class=" text-caption">{{order.code}}</q-item-section>
              <q-item-section  class=" text-caption">{{order.price}} ₽</q-item-section>
              <q-item-section  class=" text-caption">{{order.delivery_price}} ₽</q-item-section>
              <q-item-section  class=" text-caption">{{order.delivery_time}}</q-item-section>
              <q-item-section class="text-caption">{{new Date(order.created_at).toLocaleString()}}</q-item-section>

            </template>
            <q-item dense>

              <q-item-section class="bg-grey-1 q-py-md">
                <div class="q-px-md">
                  <p>Данные заказа</p>
                  <p class="q-mb-sm text-body1"> <span class="text-bold">Ф.И.О: </span>{{order.user.fio}}</p>
                  <p class="q-mb-sm text-body1"> <span class="text-bold">E-mail: </span>{{order.user.email}}</p>
                  <p class="q-mb-sm text-body1"><span class="text-bold">Телефон: </span>{{order.phone}}</p>
                  <p v-if="order.company_name" class="q-mb-sm text-body1"><span class="text-bold">Название компании: </span>{{order.company_name}}</p>
                  <p v-if="order.company_contact" class="q-mb-sm text-body1"><span class="text-bold">Контактное лицо: </span>{{order.company_contact}}</p>
                  <p class="q-mb-sm text-body1"><span class="text-bold">Город: </span>{{order.city.label}}</p>
                  <p class="q-mb-sm text-body1"><span class="text-bold">Район: </span>{{order.sector.label}}</p>
                  <p class="q-mb-sm text-body1"><span class="text-bold">Адрес доставки: </span>{{order.address}}</p>
                  <p class="q-mb-sm text-body1"><span class="text-bold">Время доставки: </span>{{order.delivery_time}}</p>
                  <p v-if="order.comment" class="q-mb-sm text-body1"><span class="text-bold">Комментарий: </span>{{order.comment}}</p>

                </div>

                <q-separator/>
                <q-list class="q-mb-md" >
                  <q-item v-for="item in order.order_items" :key="item.id">
                    <q-item-section avatar>
                      <q-avatar rounded>
                        <img :src="item.item.image">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>{{item.item.name}}  {{item.amount}}шт x {{item.item.price}} ₽ = {{item.amount * item.item.price}} ₽ </q-item-section>

                  </q-item>
                   <q-separator class="q-mb-lg"/>
                  <div class="q-px-md">
                      <p class="">Итого: {{order.price}} ₽</p>
<!--                    <q-btn @click="orderDone(order.id,'single')" color="positive" push no-caps rounded label="Заказ обработан"/>-->
                  </div>

                </q-list>
              </q-item-section>

            </q-item>

          </q-expansion-item>

        </q-list>
      </q-tab-panel>
       <q-tab-panel name="done">
           <q-list separator>
          <q-item class="q-py-md">
            <q-item-section   class=" text-bold text-dark text-caption">ID заказа</q-item-section>
            <q-item-section class="text-bold text-dark text-caption">Код<br>заказа</q-item-section>
            <q-item-section class="text-bold text-dark text-caption">Сумма<br>заказа</q-item-section>
            <q-item-section class="text-bold text-dark text-caption">Стоимость<br>доставки</q-item-section>
            <q-item-section class="text-bold text-dark text-caption">Время<br>доставки</q-item-section>
            <q-item-section class="text-bold text-dark text-caption">Дата<br>заказа</q-item-section>
            <q-item-section class="text-bold text-dark text-caption">Дата<br>обработки<br>заказа</q-item-section>



          </q-item>
          <q-expansion-item
            group="group"
            label="First"
            expand-separator
            header-class="q-py-md"
            v-for="order in done_orders"
            :key="order.id"
          >
            <template v-slot:header >
              <q-item-section  class=" text-caption">{{order.id}}</q-item-section>
              <q-item-section  class=" text-caption">{{order.code}}</q-item-section>
              <q-item-section  class=" text-caption">{{order.price}} ₽</q-item-section>
              <q-item-section  class=" text-caption">{{order.delivery_price}} ₽</q-item-section>
              <q-item-section  class=" text-caption">{{order.delivery_time}}</q-item-section>
              <q-item-section class="text-caption">{{new Date(order.created_at).toLocaleString()}}</q-item-section>
              <q-item-section class="text-caption">{{new Date(order.updated_at).toLocaleString()}}</q-item-section>

            </template>
            <q-item dense>

              <q-item-section class="bg-grey-1 q-py-md">
                <div class="q-px-md">
                  <p>Данные заказа</p>
                  <p class="q-mb-sm text-body1"> <span class="text-bold">Ф.И.О: </span>{{order.user.fio}}</p>
                  <p class="q-mb-sm text-body1"> <span class="text-bold">E-mail: </span>{{order.user.email}}</p>
                  <p class="q-mb-sm text-body1"><span class="text-bold">Телефон: </span>{{order.phone}}</p>
                  <p v-if="order.company_name" class="q-mb-sm text-body1"><span class="text-bold">Название компании: </span>{{order.company_name}}</p>
                  <p v-if="order.company_contact" class="q-mb-sm text-body1"><span class="text-bold">Контактное лицо: </span>{{order.company_contact}}</p>
                  <p class="q-mb-sm text-body1"><span class="text-bold">Адрес доставки: </span>{{order.address}}</p>
                  <p class="q-mb-sm text-body1"><span class="text-bold">Время доставки: </span>{{order.delivery_time}}</p>
                  <p v-if="order.comment" class="q-mb-sm text-body1"><span class="text-bold">Комментарий: </span>{{order.comment}}</p>

                </div>

                <q-separator/>
                <q-list class="q-mb-md" >
                  <q-item v-for="item in order.order_items" :key="item.id">
                    <q-item-section avatar>
                      <q-avatar rounded>
                        <img :src="item.item.image">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>{{item.item.name}}  {{item.amount}}шт x {{item.item.price}} ₽ = {{item.amount * item.item.price}} ₽ </q-item-section>

                  </q-item>
                   <q-separator class="q-mb-lg"/>
                  <div class="q-px-md">
                      <p class="">Итого: {{order.price}} ₽</p>

                  </div>

                </q-list>
              </q-item-section>

            </q-item>

          </q-expansion-item>

        </q-list>
      </q-tab-panel>
     </q-tab-panels>
  </q-page>
</template>
<script>

import {mapActions} from "vuex";
import {copyToClipboard} from "quasar";
export default {
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {

      if (!store.state.auth.loggedIn ) {
        redirect({ path: '/' })
      }
      if (!store.state.auth.user.is_staff ) {
        redirect({ path: '/' })
      }

    },
  data(){
    return{
      tab:'in_work',
      is_loading:false,
      sklad_filename:null,
      transport_filename:null,
      calc_filename:null,
      in_work_orders:[],
      done_orders:[],
    }
  },
  async beforeMount() {
    await this.getOrders()
  },
  methods: {
     async getOrders(){
      this.is_loading = !this.is_loading
      const in_work_orders = await this.$api.get('/api/order/all?is_done=not_done',)
      this.in_work_orders = in_work_orders.data
       const done_orders = await this.$api.get('/api/order/all?is_done=done',)
       console.log(done_orders)
      this.done_orders = done_orders.data
      this.is_loading = !this.is_loading
    },
    async orderDone(id,action){
       this.is_loading = !this.is_loading
      const response = await this.$api.post('/api/order/order_done',{id,action})
      if(response.data.sklad_filename){
        this.sklad_filename = response.data.sklad_filename
        this.transport_filename = response.data.transport_filename
        this.calc_filename = response.data.calc_filename
      }
      this.is_loading = !this.is_loading
      await this.getOrders()
    }

  }

}
</script>
