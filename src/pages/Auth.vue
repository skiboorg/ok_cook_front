<template>
  <q-page class="flex items-center justify-center">
    <AuthForm :redirect="true"/>
  </q-page>

</template>
<script>
import AuthForm from "components/AuthForm";
export default {
  components: {AuthForm},
  data(){
    return{
      tab:'index'
    }
  },

}
</script>
