<template>

    <!-- <div class="container">

        <h2>{{ msg }}</h2>
        <div class="info-user col-md-12">
            <router-link to="/home">Home</router-link> 
        </div>
        <div class="info-user col-md-12">

            <router-link :to="{ name: 'userPage',params:{id: this.userId }}">Profile</router-link>

        </div>
        <div class="info-user col-md-12">
            <p>post publier</p>
        </div>
        <div class="info-user col-md-12">
            <p>commentaire publier</p>
        </div>
          si admin  -->
        <!-- <div class="info-user col-md-12">
            <p><router-link to="/admin">Admin</router-link></p>
        </div> -->
        <!-- si admin -->

    <!-- </div> --> 

    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1"><img class="logo" src="../../assets/logo/icon-left-font-monochrome-black.svg" alt="Groupomania"> </span>
            <form class="d-flex">
            <input class="form-control " type="search" placeholder="Search any member ?" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        <router-link v-bind:to="{name: 'Sign'}">Sign</router-link> 
        <router-link to="/home">Home</router-link> 
        <!-- <router-link to="/about">About</router-link> -->
        <router-link :to="{ name: 'userPage',params:{id: this.userId }}">Profile</router-link>
        <button class="btn btn-outline-primary " @click="signOut">logout <i class="fas fa-sign-out-alt"></i></button>
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
        //    url: this.$router.push({ name: 'user', params: {id: this.userId}  }) 

        }
  },
  methods:{
    userProfile(){
        const userId = localStorage.getItem(userId);
        this.$router.push({ name: 'user', param: userId  })
    },
    signOut(){
        // localStorage.clear();
        this.$store.dispatch('userStore/logOut')
    },
  }

}
</script>

<style scoped lang="scss">
.container{
    background: white;
    width: 100%;
    // height: 10vw;
}
.info-user{
    border-top: 1px solid rgb(118, 120, 124);
    // border-bottom: 1px solid rgb(118, 120, 124);

    text-align: center;
}
.logo{
    height: 2.5rem;
}
</style>