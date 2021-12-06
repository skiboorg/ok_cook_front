import { LocalStorage } from 'quasar'
import { api } from 'boot/axios'
import { Notify } from 'quasar'
import { Screen } from 'quasar'
import { Cookies } from 'quasar'

let socket

const state = () => ({
  user:{},
  loggedIn:false,


})

const mutations = {
  updateUser(state,data){
    state.user = data
  },
  updateUserStatus(state,data){
    state.loggedIn = data
  },

}

const actions = {

  async loginUser({dispatch,ssrContext},data){
    let that = this
    let that_api = api
    that_api.post('/auth/token/login/',data.payload)
      .then(async function (response) {
        console.log(response)
        //that._vm.$cook.set('auth_token',response.data.auth_token)
        Cookies.set('auth_token',response.data.auth_token)
        that_api.defaults.headers.common['Authorization'] = 'Token ' + response.data.auth_token
        Notify.create({
          message:'Успешная авторизация',
          color:'positive',
          position: Screen.lt.sm ? 'bottom' : 'bottom-right',
        })
        await dispatch('getUser',true)
        if (data.redirect){
          await that.$router.push('/')
        }


      })
      .catch(function (error) {

        console.log(error);
        console.log(error.response.data);
        Notify.create({
          message:error.response.data.non_field_errors,
          html:true,
          color:'red',
          position: Screen.lt.sm ? 'bottom' : 'bottom-right',
        })
      });


  },
  async getUser ({commit,dispatch,getters}){
    let response
    try{
      response = await api.get( '/api/user/me/')
    }catch (e) {
       api.defaults.headers.common['Authorization'] = null
       this._vm.$cook.remove('auth_token')
       this.$router.push('/')
       console.log('getUser error',e)
      return
    }
    await this.dispatch('data/fetchCart')
    commit('updateUser', response.data)
    commit('updateUserStatus', true)

  },
  logoutUser({commit,getters}){
    commit('updateUser', {})
    commit('updateUserStatus', false)
  },
  async sendConfirmationCode (){
    const response = await api.get( '/api/user/send_confirm_code')
    Notify.create({
      message:'Код подтверждения отправлен',
      color:'positive',
      position: Screen.lt.sm ? 'bottom' : 'bottom-right',
    })
  },
}

export const getters = {
  isLoggedIn: (state) => state.loggedIn,
  ws_connected: (state) => state.ws_connected,
  user: (state) => state.user,
  notifications: (state) => state.notifications,
  new_notifications_count: (state) => state.notifications.filter(x=>!x.is_viewed).length,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
