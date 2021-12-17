import {Cookies} from 'quasar'
import api from 'axios'


export default async ({ app, router, Vue, store, ssrContext }) => {
  console.info('boot: init entered')

  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies


  let session_id = cookies.get('session_id')
  let uid = Date.now().toString(36) + Math.random().toString(36).substring(2)

  if(session_id){
    store.dispatch('data/setSessionID',session_id)
  }else{
    cookies.set('session_id',uid)
    store.dispatch('data/setSessionID',uid)
  }

  let token = cookies.get('auth_token')
  app.config.globalProperties.$cook = cookies

  if (token) {
   await store.dispatch('auth/getUser')
  }
  await store.dispatch('data/fetchComplects')
  await store.dispatch('data/fetchCart')

  app.config.globalProperties.$auth = store.state.auth

  app.config.globalProperties.$filters = {


}

  console.info('boot: init exited')
}

