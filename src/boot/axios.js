
import { boot } from 'quasar/wrappers'
import {Cookies} from "quasar";
import axios from 'axios'

const api = axios.create({ baseURL: process.env.API })
export default boot(({ app, ssrContext }) => {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies
  let token = cookies.get('auth_token')
  if (token) {
    console.log('Token exists axios')
    api.defaults.headers.common['Authorization'] = 'Token ' + token
  }else {
    if(process.env.SERVER){
      api.defaults.headers.common['Authorization'] = null
    }
  }
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
