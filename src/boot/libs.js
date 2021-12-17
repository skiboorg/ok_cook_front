import { boot } from 'quasar/wrappers'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import VueSmoothScroll from 'vue3-smooth-scroll'
import 'vue3-carousel/dist/carousel.css';

export default boot(({ app }) => {
  app.use(VueSmoothScroll)
  app.component('Carousel',Carousel)
  app.component('Slide',Slide)
  app.component('Navigation',Navigation)
  app.component('Pagination',Pagination)
})
