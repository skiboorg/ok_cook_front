<template>
  <q-page class="flex column items-center justify-center">
     <h3 class="text-h5">Ваш заказ успешно оплачен</h3>
      <h3 class="text-h5">Номер заказа : <span class="text-primary">{{$route.params.order_id}}</span></h3>
      <q-btn to="/" no-caps push rounded color="primary" label="На главную"/>
  </q-page>

</template>
