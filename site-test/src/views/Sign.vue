<template>
  <div class="home col-md-5 mx-auto">

    <div class="sign card ">
        <h2>{{title}}</h2>
        <!-- <h2 v-if="show">{{negatif_title}}</h2> -->



                <div v-if="title == 'connexion'" ><Login/></div>

            <transition name="fade">
                <div v-if="title == 'inscription'"><SignIn/></div>
            </transition>

        <div class="togSign d-flex justify-content-between">

                <p v-if="title == 'connexion'">pas encore de compte ? <span @click="toggle"> enregistrez-vous ! </span> </p>
                <p v-if="title == 'inscription'">déjà un compte ? <span @click="toggle">connecter vous !</span></p>

        </div>

    </div>
  </div>

</template>

<script>
// @ is an alias to /src
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
            title: "connexion",
        }
    },
    methods:{
        toggle(){
            if(this.title == 'inscription'){
                this.title = 'connexion'
            }
            else if(this.title == 'connexion'){
                this.title = 'inscription'
            }
        },
        getDataSign(){
            if(this.title == 'connexion'){
                console.log('ok submit');
                const email = document.getElementsByName("email_login")[0].value;
                const password = document.getElementsByName("password_login")[0].value;
                console.log(email , password);
            }
            if(this.title == 'inscription'){
                console.log('ok submit');
                const nom = document.getElementsByName("nom_Sign")[0].value;
                const prenom = document.getElementsByName("prenom_Sign")[0].value;
                const email = document.getElementsByName("email_Sign")[0].value;
                const password = document.getElementsByName("password_Sign")[0].value;
                console.log(email , password ,nom ,prenom);
            }
        },
// [Sign]__________________________________
        
// [Login]__________________________________


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
