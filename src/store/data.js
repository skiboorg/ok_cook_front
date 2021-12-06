import { api } from 'boot/axios'


const state = () => ({
  cart:[],
  menu_type:[],
  session_id:''

})

const mutations = {
  updateMenuType(state,data){
    state.menu_type = data
  },
   updateCart(state,data){
    state.cart = data
  },
  updateSessionID(state,data){
    state.session_id = data
  }



}

const actions = {


  async fetchMenuTypes ({commit}){
    const response = await api.get( '/api/data/menu_type')
    commit('updateMenuType', response.data)
  },
  async fetchCart({commit,getters}){
    console.log('getters[session_id]',getters['session_id'])
    const response = await api.get(`/api/cart/get?session_id=${getters['session_id']}`)
    commit('updateCart',response.data)

  },
  setSessionID({commit},data){
    commit('updateSessionID',data)

  },



}

export const getters = {
  menu_type: (state) => state.menu_type,
  cart: (state) => state.cart,
  session_id: (state) => state.session_id,




}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
