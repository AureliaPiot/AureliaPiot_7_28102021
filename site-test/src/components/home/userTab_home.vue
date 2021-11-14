<template>

    <nav class="navbar " id="head">
      
        <span class="navbar-brand mb-0 h1"><img class="logo" src="../../assets/logo/icon-left-font-monochrome-black.svg" alt="Groupomania"> </span>

        
        <div class="link-group">
            <!-- <router-link v-bind:to="{name: 'Sign'}">Sign</router-link>  -->
            <button><router-link to="/home"><i class="fas fa-home"></i></router-link></button> 
            <button><router-link :to="{ name: 'userPage',params:{id: this.userId }}"><i class="fas fa-user"></i></router-link></button>
            <button  @click="signOut"><i class="fas fa-sign-out-alt"></i></button>
        </div>
      
    </nav>



</template>

<script>
export default {
    name:'tab_home',
    props: {
        msg: String
    },
       data(){  
       return{
           userId : localStorage.getItem('userId'),
        }
  },
  methods:{
    userProfile(){
        const userId = localStorage.getItem(userId);
        this.$router.push({ name: 'user', param: userId  })
    },
    signOut(){
        this.$store.dispatch('userStore/logOut')
    },
  },
   async beforeCreate(){
       await this.$store.dispatch('userStore/getUserData');
   },
    // created(){
    //     console.log(this.$store.state.userStore.localStorage.userId)
    // },
}
</script>

<style scoped lang="scss">
nav{
    width: 100%;
    padding: 1rem 5rem;
    background: white;
    border-bottom: 4px solid #1f4988;
    button{
        margin: 0 1rem;
        width: 3.6rem;
        height: 3.6rem;
        border: none;
        border-radius: 50%;
        background-color: #1f4988;

        font-size: 2rem;
        color: white ;

         a{
            color: white ;
        }
    }
}
.info-user{
    border-top: 1px solid rgb(118, 120, 124);
    text-align: center;
}
.logo{
    height: 2.5rem;
}

@media (max-width: 768px) {
  nav{
    padding: 1rem 1rem;
    button{
        margin: 0 1rem;
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.3rem;

    }
    .logo{
        height: 1.5rem;
    }
}
}
@media (max-width: 420PX) {
    nav{
            padding: 0.5rem 0;
    justify-content: center;
    .logo{
        margin-bottom:1rem;
    }
    }

}

</style>