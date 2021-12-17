<template>
  <q-page>
    <h3>Ваш профиль</h3>


    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
       swipeable
            mobile-arrows
            outside-arrows
            narrow-indicator
    >
      <q-tab name="personal" label="Персональные данные" />
      <q-tab name="orders" label="Заказы" />
      <q-tab name="refferal" label="Реффералы" />
    </q-tabs>

    <q-separator class="q-mb-lg"/>

    <q-tab-panels swipeable v-model="tab" animated class="bg-grey-2">
      <q-tab-panel name="personal">
        <p class="q-md-lg">Рефферальная сссылка:<br> https://ok-cook.ru/?ref={{$auth.user.own_ref_code}}
          <span @click="copyCB(`https://ok-cook.ru/?ref=${$auth.user.own_ref_code}`)" class="link text-caption text-primary cursor-pointer">скопировать</span></p>
        <q-form >
          <p>Тип плательщика</p>
          <q-option-group
            :options="userType"
            class="q-mb-md"
            type="radio"
            dense
            v-model="userData.user_type"
          />
          <p>Адрес доставки</p>
          <q-input dense outlined v-model="userData.address"/>
          <div v-if="userData.user_type==='ur'">
            <p class="q-mb-sm">Название компании</p>
            <q-input class="q-mb-sm" dense outlined v-model="userData.company_name"/>
            <p class="q-mb-sm">Юридический адрес</p>
            <q-input class="q-mb-sm" dense outlined v-model="userData.company_address"/>
            <p class="q-mb-sm">ИНН</p>
            <q-input class="q-mb-sm" dense outlined v-model="userData.company_inn"/>
            <p class="q-mb-sm">КПП</p>
            <q-input class="q-mb-sm" dense outlined v-model="userData.company_kpp"/>
            <p class="q-mb-sm">Контактное лицо</p>
            <q-input class="q-mb-sm" dense outlined v-model="userData.company_contact"/>
          </div>

          <p class="q-mb-sm">E-Mail</p>
          <q-input class="q-mb-sm" readonly dense outlined v-model="userData.email"/>
          <p class="q-mb-sm">Телефон</p>
          <q-input class="q-mb-sm" dense outlined v-model="userData.phone"/>
          <q-btn push rounded @click="updateUser" :loading="is_loading" no-caps label="Сохранить" color="primary" class="q-py-sm text-weight-bold"/>
        </q-form>
      </q-tab-panel>

      <q-tab-panel name="orders">

        <q-list separator>
          <q-item class="q-py-md">
            <q-item-section  class="q-mr-lg text-bold text-dark">ID заказа</q-item-section>
            <q-item-section class="text-bold text-dark">Код заказа</q-item-section>
            <q-item-section class="text-bold text-dark">Дата заказа</q-item-section>


          </q-item>
          <q-expansion-item
            group="group"
            label="First"
            header-class="q-py-md"
            v-for="order in orders"
            :key="order.id"
          >
            <template v-slot:header >
              <q-item-section  class="q-mr-lg">{{order.id}}</q-item-section>
              <q-item-section  class="q-mr-lg">{{order.code}}</q-item-section>

              <q-item-section >{{new Date(order.created_at).toLocaleString()}}</q-item-section>
            </template>
            <q-item dense>
              <q-item-section  class=" text-caption">Состав заказа</q-item-section>
              <q-item-section>
                <q-list class="q-mb-md" >
                  <q-item v-for="item in order.order_items" :key="item.id">
                    <q-item-section avatar>
                      <q-avatar rounded>
                        <img :src="item.item.image">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>{{item.item.name}} x {{item.item.items_added}}шт<br>Вес: {{item.item.weigth}} Калорий: {{item.item.calories}}</q-item-section>
                  </q-item>
                </q-list>
              </q-item-section>
              <q-item-section></q-item-section>
            </q-item>
            <q-item dense>
              <q-item-section class="text-bold ">Стоимость заказа</q-item-section>
              <q-item-section class="text-bold ">
              {{order.menu_type.price}} руб
              </q-item-section>
              <q-item-section></q-item-section>
            </q-item>
          </q-expansion-item>

        </q-list>
      </q-tab-panel>

      <q-tab-panel name="refferal">
        <p>Собственный баланс: {{$auth.user.balance}} руб</p>
        <p>Реферальный баланс: {{$auth.user.ref_bonuses}} руб</p>
        <p class="text-bold text-h6">Ваши рефералы</p>
        <q-list >
          <q-expansion-item
            group="somegroup"
            icon="looks_one"
            label="Первая линия"
            header-class="text-primary text-bold"
          >

            <q-list  separator>
              <q-item v-for="user in referals.first_line_users" :key="user.id">
                <q-item-section>
                  <q-item-label overline>ФИО</q-item-label>
                  <q-item-label>{{user.fio ? user.fio : 'Не указано'}}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Дата регистрации</q-item-label>
                  <q-item-label>{{new Date(user.date_joined).toLocaleString() }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Всего покупок</q-item-label>
                  <q-item-label>{{user.total_spend}} руб</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

          </q-expansion-item>

          <q-separator />

          <q-expansion-item group="somegroup" icon="looks_two" label="Вторая линия" header-class="text-primary text-bold">
       <q-list  separator>
              <q-item v-for="user in referals.second_line_users" :key="user.id">
                <q-item-section>
                  <q-item-label overline>ФИО</q-item-label>
                  <q-item-label>{{user.fio ? user.fio : 'Не указано'}}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Дата регистрации</q-item-label>
                  <q-item-label>{{new Date(user.date_joined).toLocaleString() }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Всего покупок</q-item-label>
                  <q-item-label>{{user.total_spend}} руб</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item group="somegroup" icon="looks_3" label="Третья линия" header-class="text-primary text-bold">
            <q-list  separator>
              <q-item v-for="user in referals.third_line_users" :key="user.id">
                <q-item-section>
                  <q-item-label overline>ФИО</q-item-label>
                  <q-item-label>{{user.fio ? user.fio : 'Не указано'}}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Дата регистрации</q-item-label>
                  <q-item-label>{{new Date(user.date_joined).toLocaleString() }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Всего покупок</q-item-label>
                  <q-item-label>{{user.total_spend}} руб</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
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

    },
  data(){
    return{
      tab:'personal',
      is_loading:false,
      orders:[],
      referals:[],
      userType: [
        { label: 'Физическое лицо', value: 'fiz' },
        { label: 'Юридическое лицо', value: 'ur' },
      ],
      userData:{
        user_type:this.$auth.user.is_company ? 'ur':'fiz',
        address:this.$auth.user.address,
        email:this.$auth.user.email,
        phone:this.$auth.user.phone,
        city:this.$auth.user.city,
        company_name:this.$auth.user.company_name,
        company_address:this.$auth.user.company_address,
        company_inn:this.$auth.user.company_inn,
        company_kpp:this.$auth.user.company_kpp,
        company_contact:this.$auth.user.company_contact,
      }
    }
  },
  async beforeMount() {
    const response = await this.$api.get('/api/order/get')
    const refferals = await this.$api.get('/api/user/get_referals')
    this.orders = response.data
    this.referals = refferals.data
  },
  methods: {
    ...mapActions('auth',['getUser']),
    copyCB(text){
      copyToClipboard(text)
        .then(() => {
          this.$q.notify({
            message: 'Ссылка скопирована',
            position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
            html:true,
            color:'positive',
            icon: 'announcement'
          })
        })
        .catch(() => {
          // fail
        })
    },
    async updateUser(){
      this.is_loading = !this.is_loading
      let formData = new FormData()
      formData.set('userData', JSON.stringify(this.userData))

      const response = await this.$api({
        method: 'post',
        headers:{
          'content-type': 'multipart/form-data'
        },
        url: '/api/user/update',
        data: formData
      })
      console.log(response.data)
      await this.getUser(false)
      this.$q.notify({
        message: 'Персональные данные обновлены',
        position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
        color:'positive',
        icon: 'announcement'
      })
      this.is_loading = !this.is_loading
    },
  }

}
</script>
