<template>

  <div v-if="!is_register_mode" class="sign-form">
    <div class="flex items-center justify-between q-mb-lg">
      <p v-if="!is_password_recover" class="no-margin text-fs-18 text-bold">Пожалуйста, авторизуйтесь</p>
      <p v-else class="no-margin text-fs-18 text-bold">Сброс пароля</p>
    </div>
    <div v-if="!is_password_recover" class="">
      <q-form @submit="userLoginAction" class="full-width q-gutter-sd q-mb-lg">
        <q-input

          :dense="!$q.screen.gt.sm"
          v-model="userLogin.email"
          rounded
          outlined
          label="Ваш E-mail*"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Это обязательное поле',
            val => email_re.test(String(val)) || 'Введен не корректный адрес e-mail']"/>
        <q-input
          :dense="!$q.screen.gt.sm"
          rounded
          outlined
          :type="isPwd ? 'password' : 'text'"
          v-model="userLogin.password"
          label="Пароль"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Это обязательное поле' ]">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"/>
          </template>
        </q-input>
        <q-btn rounded push :loading="is_loading" label="Войти"  no-caps type="submit"  color="primary" class="full-width  q-py-md text-bold"/>

      </q-form>
      <p @click="is_password_recover=true" class="text-right q-mb-md cursor-pointer text-primary text-caption link">Забыли свой пароль?</p>
      <p @click="is_register_mode=true" class="text-right q-mb-none cursor-pointer text-primary text-caption link">Зарегистрироваться</p>


    </div>
    <div v-else class="">
      <q-form @submit="userRestorePassword" class="full-width q-gutter-sd q-mb-lg">
        <p class="text-caption">На указанный E-mail будет выслан новый пароль</p>
        <q-input
          rounded
          outlined
          :dense="!$q.screen.gt.sm"
          v-model="userData.email"
          label="Ваш E-mail*"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Это обязательное поле',
            val => email_re.test(String(val)) || 'Введен не корректный адрес e-mail']"/>
        <q-btn rounded push :loading="is_loading" label="Сбросить пароль"  no-caps type="submit"  color="primary"
               class="q-mt-md full-width q-py-md text-bold q-mb-lg"

        />
        <p @click="is_password_recover=false" class="text-right q-mb-md cursor-pointer text-primary text-caption link">Вход</p>
      <p @click="is_register_mode=true" class="text-right q-mb-none cursor-pointer text-primary text-caption link">Зарегистрироваться</p>
      </q-form>
    </div>

  </div>
  <div v-else class="sign-form ">
      <div class="flex items-center justify-between q-mb-lg">
        <p class="no-margin text-fs-18 text-bold">Регистрация</p>
     </div>
      <q-form @submit="completeRegistration" class="full-width q-gutter-sd q-mb-lg">
        <q-input
          rounded
          outlined
          :dense="!$q.screen.gt.sm"
          v-model="userData.email"
          label="Ваш E-mail*"
          lazy-rules
           :rules="[ val => val && val.length > 0 || 'Это обязательное поле',
            val => email_re.test(String(val)) || 'Введен не корректный адрес e-mail']"/>
        <q-input
          :dense="!$q.screen.gt.sm"
          rounded
          outlined
          :type="isPwd ? 'password' : 'text'"


          v-model="userData.password1"
          label="Пароль*"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Это обязательное поле' ]">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"/>
          </template>
        </q-input>
        <q-input
          :dense="!$q.screen.gt.sm"
          rounded
          outlined
          :type="isPwd ? 'password' : 'text'"
          v-model="userData.password"
          label="Повторите пароль*"

          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Это обязательное поле' ,
           val => val===userData.password || 'Пароли не совпадают' ]">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"/>
          </template>
        </q-input>
        <q-input
          :dense="!$q.screen.gt.sm"
          rounded
          outlined
          class="q-mb-md"
          v-model="userData.ref_code"
          :readonly="is_have_ref_code"
          label="Реферальный код"/>

        <q-checkbox class="q-mb-md text-caption text-weight-thin" v-model="agree" label="Я согласен с условиями обработки персональных данных" />

        <q-btn dense rounded push :disable="!agree" :loading="is_loading" label="Регистрация"  no-caps type="submit"  color="primary"
               class="full-width  q-py-md text-bold q-mb-lg"/>
         <p @click="is_register_mode=false" class="text-right q-mb-md cursor-pointer text-primary text-caption link">Вход</p>

      </q-form>

    </div>
</template>
<script>
import { Cookies } from 'quasar'
import { mapActions } from 'vuex'


export default {
  props:['redirect'],

  data () {
    return {
      is_password_recover:false,
      is_register_mode:false,
      is_loading:false,
      isPwd:true,
      agree:false,
      is_have_ref_code:false,

      userLogin:{
        email:null,
        password:null,
      },
      userData:{
        email:null,
        password1:null,
        password:null,
        ref_code:null
      },
      email_re:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    }
  },
  beforeMount() {
    const ref_code = Cookies.get('ref_code')
    console.log(ref_code)
    if (ref_code){
      this.userData.ref_code = ref_code
      this.is_have_ref_code = true
    }
    else {
      this.is_have_ref_code = false
    }
  },
  methods:{
    ... mapActions('auth',['loginUser']),
    async userRestorePassword(){
      this.is_loading = !this.is_loading
      this.is_loading = !this.is_loading

    },
    async userLoginAction() {

      this.is_loading = true
      this.userLogin.email = this.userLogin.email.toLowerCase()
      await this.loginUser({payload:this.userLogin,redirect:this.redirect})
      this.is_loading = false
    },

    async completeRegistration(){
      this.is_loading = true
      this.userData.email = this.userData.email.toLowerCase()
      try{
        await this.$api.post('/auth/users/', {
          email:this.userData.email,
          password:this.userData.password,
          used_ref_code:this.userData.ref_code,
        })
        this.$q.notify({
          message: 'Аккаунт создан',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color:'positive',
          icon: 'announcement'
        })

        Cookies.remove('ref_code')
        this.is_loading=false
        await this.loginUser({payload:this.userData,redirect:this.redirect})
      }catch (e) {
        this.$q.notify({
          message: 'Ошибка при создании аккаунта',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color:'red',
          icon: 'announcement'
        })
      }
      this.is_loading = false
    },



  }
}
</script>
<style lang="sass">
.sign-form
  width: 370px
  max-width: 90vw
@media (max-width: 768px)
  .sign-form
    width: 100%
</style>
