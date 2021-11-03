<template>
  <div class="home col-md-5 mx-auto">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <TestComponents msgTest="welp, this it a test" /> -->

    <div class="sign card ">
        <h2 v-if="!show">{{title}}</h2>
        <h2 v-if="show">{{negatif_title}}</h2>

        <!-- <form class="col-md-10 mx-auto"> -->

                <div v-if="!show" ><Login/></div>

            <transition name="fade">
                <div v-if="show"><SignIn/></div>
            </transition>

        <div class="d-flex justify-content-center">
           <button id="signSubmit" type="submit" class="submit btn btn-primary">Entrée</button>
        </div>

        <div class="togSign d-flex justify-content-between">
            <!-- <div class="row"> -->

                <p v-if="!show">pas encore de compte ? <span v-on:click="show = !show"> enregistrez-vous ! </span> </p>
                <p v-if="show">déjà un compte ? <span v-on:click="show =!show">connecter vous !</span></p>

            <!-- </div> -->
        </div>

    </div>
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
            show : false,
            title:'inscription',
            negatif_title:'connexion'
        }
    },

  mounted(){
        console.log(this.show);
        if(this.show == false){
            this.title = 'connexion';
            this.negatif_title = 'inscription';
        }
        console.log(this.title);
    },
    methods:{
    isActive() {
            return this.title;
        }
    }
}

</script>
<style lang="scss">
.home{
    margin-top:5rem
}
.togSign{
    margin-top: 1rem;
}
h2{
 text-align: center;

}
.sign{
    background: white;
    padding:3rem 4rem 1rem;

    .submit{
    padding: 0.3rem 2rem;
    }
    span{
        color: rgb(45, 45, 168);
    }
    span:hover{
        color: rgb(18, 18, 59);
        cursor: pointer;
    }
}


.fade{
  transition: opacity .5s;
}
</style>
