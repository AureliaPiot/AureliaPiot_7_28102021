<template>
  <div class="home col-md-5 mx-auto">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <TestComponents msgTest="welp, this it a test" /> -->
    <SignIn/>
  
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import SignIn from '@/components/sign/signin.vue'






export default {
  name: 'sign',
  components: {
    SignIn
  }
}
</script>
<style scoped>
.home{
    margin-top:5rem
}
</style>
