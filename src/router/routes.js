
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      //{ path: 'menu', component: () => import('pages/Menu.vue') },
      { path: 'rations', component: () => import('pages/RationSelect.vue') },
      { path: 'ration/:ration_id', component: () => import('pages/Ration.vue') },
      { path: 'auth', component: () => import('pages/Auth.vue') },
      { path: 'lk', component: () => import('pages/Lk.vue') },
      { path: 'checkout', component: () => import('pages/Checkout.vue') },
      { path: 'order/:order_id', component: () => import('pages/PaySuccess.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
