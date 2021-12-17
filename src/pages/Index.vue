<template>
  <q-page>
    <section class="offer">
      <div class="row q-col-gutter-none q-col-gutter-md-lg items-center">
        <div class="col-12 col-md-6 offer-text">
          <h1 class="text-primary text-42 text-center text-lh-110">Вкусная еда на любой вкус</h1>
          <div class="flex items-center justify-between no-wrap q-mb-lg q-mb-md-xl">
            <p class="text-center text-bond text-bold text-h4 col-grow no-margin">Smart Frost Technology</p>
            <q-img  src="~assets/frost.png"/>
          </div>
          <div class="text-center">
            <q-btn to="/rations" unelevated push size="lg" class=" q-py-sm q-px-xl" color="secondary" rounded label="Выбрать блюда"/>
          </div>

        </div>
        <div class="col-12 col-md-6 gradient-box full-height flex column justify-center items-start">
          <q-img class="gradient-box--img" :ratio="4/3" src="~assets/bags.png"/>
        </div>
      </div>
    </section>
    <section class="about">
      <h3 class="text-center text-primary section-title">Ваш бесплатный повар на каждый день</h3>
      <div class="row q-col-gutter-xl">
        <div class="col-12 col-md-6">
          <q-img  src="~assets/about-img.png"/>
        </div>
        <div class="col-12 col-md-6 relative-position">
          <div class="frost-bg absolute-full"></div>
          <p class="text-bond text-h3 q-mb-lg">Все о технологии умной заморозки</p>
          <p class="text-bond text-h5">Технология умной заморозки заготовки в охлажденномдо- 18 градусов помещении, где
            поддерживается постоянная температура. Эта технология позволяет сохранить максимум полезности и витаминов.
          </p>
        </div>
      </div>
    </section>
    <section ref="our_products" id="our_products" class="we-offer">
     <h3 class="text-center text-primary q-mb-md">Что мы предлагаем</h3>
      <p class="text-bond text-h5 text-center">Заинтересованы? Самые популярные блюда из нашего меню. </p>
      <div class="we-offer--wrapper">
        <div class="we-offer--items">
          <router-link to="/rations"> <q-img  src="~assets/zavtrak.png"/></router-link>
          <router-link to="/rations"><q-img  src="~assets/obed.png"/></router-link>
          <router-link to="/rations"><q-img  src="~assets/uzin.png"/></router-link>



      </div>
      </div>

    </section>
    <section class="about">
      <h3 class="text-center text-primary section-title">Вкусная еда на любой вкус для всей семьи</h3>
      <div class="row q-col-gutter-xl">
        <div class="col-12 col-md-6">
          <q-img  src="~assets/about-img-1.png"/>
        </div>
        <div class="col-12 col-md-6 ">
          <p class="text-bond text-h3 q-mb-lg">Домашние рецепты отлучших поваров у тебяв морозилке</p>
          <p class="text-bond text-h5">Мы привезем вам недельный рацион которыйне портится в
            морозилке до 120 дней . Вы небудите тратить время на готовку.
          </p>
        </div>
      </div>
    </section>

    <section ref="feedback" id="feedback" class="feedback">
      <p class="text-center text-secondary text-h3 section-title">Избранные отзывы</p>
       <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      padding

      class="bg-primary fit-content"
    >
      <q-carousel-slide :name="1" class="column no-wrap ">
        <div class="row q-col-gutter-lg ">
          <div class="col-12 col-md-4 feedback-item">
            <q-icon class="q-mb-lg" color="white" size="50px" name="format_quote"/>
            <p class="text-bond text-h5">Продовольственный онлайн-центр</p>
            <p class="text-bond text-body1">Рекомендации — это короткие цитаты от людей,которые любят ваш бренд. Это отличный способубедить клиентов попробовать ваши услуги.</p>
          </div>
            <div class="col-12 col-md-4 feedback-item">
            <q-icon class="q-mb-lg" color="white" size="50px" name="format_quote"/>
            <p class="text-bond text-h5">Продовольственный онлайн-центр</p>
            <p class="text-bond text-body1">Рекомендации — это короткие цитаты от людей,которые любят ваш бренд. Это отличный способубедить клиентов попробовать ваши услуги.</p>
          </div>
             <div class="col-12 col-md-4 feedback-item">
            <q-icon class="q-mb-lg" color="white" size="50px" name="format_quote"/>
            <p class="text-bond text-h5">Продовольственный онлайн-центр</p>
            <p class="text-bond text-body1">Рекомендации — это короткие цитаты от людей,которые любят ваш бренд. Это отличный способубедить клиентов попробовать ваши услуги.</p>
          </div>
        </div>
      </q-carousel-slide>
           <q-carousel-slide :name="2" class="column no-wrap ">
        <div class="row q-col-gutter-lg ">
          <div class="col-12 col-md-4 feedback-item">
            <q-icon class="q-mb-lg" color="white" size="50px" name="format_quote"/>
            <p class="text-bond text-h5">Продовольственный онлайн-центр</p>
            <p class="text-bond text-body1">Рекомендации — это короткие цитаты от людей,которые любят ваш бренд. Это отличный способубедить клиентов попробовать ваши услуги.</p>
          </div>
            <div class="col-12 col-md-4 feedback-item">
            <q-icon class="q-mb-lg" color="white" size="50px" name="format_quote"/>
            <p class="text-bond text-h5">Продовольственный онлайн-центр</p>
            <p class="text-bond text-body1">Рекомендации — это короткие цитаты от людей,которые любят ваш бренд. Это отличный способубедить клиентов попробовать ваши услуги.</p>
          </div>
             <div class="col-12 col-md-4 feedback-item">
            <q-icon class="q-mb-lg" color="white" size="50px" name="format_quote"/>
            <p class="text-bond text-h5">Продовольственный онлайн-центр</p>
            <p class="text-bond text-body1">Рекомендации — это короткие цитаты от людей,которые любят ваш бренд. Это отличный способубедить клиентов попробовать ваши услуги.</p>
          </div>
        </div>
      </q-carousel-slide>


    </q-carousel>
    </section>
    <section class="contacts bg-secondary">
      <div class="row  items-center">
        <div class="col-12 col-md-6">
          <q-img  src="~assets/contacts-img.png"/>
        </div>
        <div class="col-12 col-md-6 contacts-bg q-pl-md q-pl-md-xl q-py-lg">
           <p class=" text-h3 text-primary  text-lh-100">Свяжитесь с нами</p>
          <p class="text-bond text-h6 q-mb-none">ЭЛЕКТРОННЫЙ АДРЕС</p>
          <p> <a class="text-bond text-h6" href="mailto:privyet@website.ru">privyet@website.ru</a></p>
 <p class="text-bond text-h6 q-mb-none">ПОЧТОВЫЙ АДРЕС</p>
          <p class="text-bond text-h6"> ул.Первомайская, д.123, индекс 123321</p>
           <p class="text-bond text-h6 q-mb-none">ТЕЛЕФОННЫЙ НОМЕР</p>
          <p> <a class="text-bond text-h6" href="tel:+74994697890">+7(499) 469-78-90</a></p>
        </div>
      </div>
    </section>
    <section class="philosophy">
      <p class="text-center text-primary text-h3 section-title">Наша философия</p>
      <p>Подробно расписать технологию SMART FROST расписать приемущества почему выбрать должны именно нас Подробно расписать технологию SMART FROST расписать приемущества почему выбрать должны именно нас</p>
      <div class="text-center">
        <img draggable="false" src="~assets/philosophy-img.png">
      </div>
    </section>
    <section ref="faq" id="faq" class="faq">
       <p class="text-center text-primary text-h3 ">Ответы на вопросы</p>
      <div class="text-center">
         <img draggable="false" src="~assets/logo.png">
      </div>
      <div class="faq-wrapper">
          <q-list class="q-mb-lg">
      <q-expansion-item
        group="faqgroup"
        :label="item.q"
        header-class="text-primary text-bold"
        v-for="(item,index) in faq"
        :default-opened="index===0"
        :key="index"
        class="bg-grey-3 q-mb-md"
      >
        <q-card class="bg-grey-2">
          <q-card-section>
           {{item.a}}
          </q-card-section>
        </q-card>
      </q-expansion-item>


    </q-list>
         <div class="text-center">
         <img draggable="false" src="~assets/faq-img.png">
      </div>
      </div>
    </section>

  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
export default {
  data(){
    return{
      slide:1,
      faq:[
        {q:'Вопрос Вопрос Вопрос Вопрос Вопрос ', a:'Подробно расписать технологию SMART FROST расписать приемущества почему выбрать должны именно нас Подробно расписать технологию SMART FROST расписать приемущества почему выбрать должны именно нас'},
        {q:'Вопрос Вопрос Вопрос Вопрос Вопрос ', a:'Подробно расписать технологию SMART FROST расписать приемущества почему выбрать должны именно нас Подробно расписать технологию SMART FROST расписать приемущества почему выбрать должны именно нас'},
        {q:'Вопрос Вопрос Вопрос Вопрос Вопрос ', a:'Подробно расписать технологию SMART FROST расписать приемущества почему выбрать должны именно нас Подробно расписать технологию SMART FROST расписать приемущества почему выбрать должны именно нас'},
        {q:'Вопрос Вопрос Вопрос Вопрос Вопрос ', a:'Подробно расписать технологию SMART FROST расписать приемущества почему выбрать должны именно нас Подробно расписать технологию SMART FROST расписать приемущества почему выбрать должны именно нас'},
      ]
    }
  },
  mounted() {
      console.log('beforeMount')
    const hash = this.$route.hash
    console.log(hash)
     if (this.$route.hash){
       const ref = hash.replace('#','')
        const myEl = this.$refs[ref]
    console.log(myEl)
      this.$smoothScroll({
        updateHistory:false,
        scrollTo: myEl, // scrollTo is also allowed to be number
        //hash: this.$route.hash // required if updateHistory is true
      })
     }

    if(this.$route.query.ref){
      console.log(this.$route.query.ref)
      const $q = useQuasar()
      const value = $q.cookies.set('ref_code',this.$route.query.ref)
    }


    }
}
</script>
<style lang="sass">
.gradient-box
  position: relative
  background: linear-gradient(90deg,$grey-2 50%, #f29039 50%)
  height: 500px !important
  &--img
    position: relative
    left: -20px
@media (max-width: 768px)
  .gradient-box
    height: unset !important
    order: 1
    &--img
      left: -10px
  .offer-text
    order: 2
.frost-bg
  background: url(~assets/frost.png) no-repeat center
  z-index: -1
  opacity: .5
@media (max-width: 768px)
  .frost-bg
    background-position: bottom
.we-offer
  &--wrapper
    background: linear-gradient(180deg, $grey-2 50%, $primary 50%)
  &--items
    max-width: 1000px
    margin: 0 auto
    display: grid
    grid-template-columns: repeat(3,1fr)
    grid-gap: 70px
@media (max-width: 768px)
  .we-offer
    &--wrapper
      background: $primary
    &--items
      grid-template-columns: 1fr
      grid-gap: 0px
.feedback
  position: relative
  & .section-title
    margin-bottom: 220px
    z-index: 1
  &::before
    position: absolute
    content: url(~assets/feedback-img.png)
    top: 65px
    left: 50%
    transform: translateX(-50%)
    z-index: 2

.contacts
  &-bg
    background: url(~assets/axes.png) no-repeat center
    background-size: cover
.philosophy
  margin-bottom: 65px
.faq
  position: relative
  overflow-x: hidden
  z-index: 1
  &::before
    position: absolute
    content: url(~assets/frost-1.png)
    left: -100px
    top: 50%
    transform: translateY(-50%)
    z-index: -1
  &::after
    position: absolute
    content: url(~assets/frost-2.png)
    right: -100px
    top: 50%
    transform: translateY(-50%)
    z-index: -1
  &-wrapper
    max-width: 800px
    margin: 0 auto
@media (max-width: 768px)
  .faq
    &::before
      content: none
    &::after
      content: none
</style>
