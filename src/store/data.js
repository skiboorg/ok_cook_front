import { api } from 'boot/axios'


const state = () => ({
  cart:{
    "id": 5,
    "items": [],
    "complects": []},
  complects:[],
  complect:{},
  session_id:''

})

const mutations = {
  updateComplects(state,data){
    state.complects = data
  },
  updateComplect(state,data){
    state.complect = data
  },
   updateCart(state,data){
    state.cart = data
  },
  updateSessionID(state,data){
    state.session_id = data
  }



}

const actions = {


  async fetchComplects ({commit}){
    const response = await api.get( '/api/data/complects')
    commit('updateComplects', response.data)
  },
  async fetchComplect ({commit},data){
    const response = await api.get( `/api/data/complect?id=${data}`)
    commit('updateComplect', response.data)
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
  complects: (state) => state.complects,
  complect: (state) => state.complect,
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
