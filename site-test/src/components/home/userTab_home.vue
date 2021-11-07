<template>

    <div class="container">

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
        <!-- si admin -->
        <div class="info-user col-md-12">
            <p><router-link to="/admin">Admin</router-link></p>
        </div>
        <!-- si admin -->

    </div>

</template>

<script>
export default {
    name:'userTab_home',
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
      }
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
</style>