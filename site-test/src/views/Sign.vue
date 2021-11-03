<template>
  <div class="home col-md-5 mx-auto">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <TestComponents msgTest="welp, this it a test" /> -->
    <div v-if="url_param == 'login'" ><Login/></div>
    <div v-if="url_param == 'sign'"><SignIn/></div>

  
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import SignIn from '@/components/sign/signin.vue'
import Login from '@/components/sign/login.vue'







export default {
  name: 'sign',
  components: {
    SignIn,
    Login
  },
    data(){
        return{ 
        url_param: null
        }
    },

  mounted(){
        this.url_param = this.$route.params.sign;
        console.log(this.url_param);

    }
}

</script>
<style lang="scss">
.home{
    margin-top:5rem
}
h2{
 text-align: center;

}
.sign{
    background: white;

    .submit{
    padding: 0.3rem 2rem;
    }

}
</style>
