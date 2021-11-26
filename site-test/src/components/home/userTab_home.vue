<template>

    <nav class="navbar " id="head">
        <router-link to="/home">
            <span class="navbar-brand mb-0 h1"><img class="logo" src="../../assets/logo/icon-left-font-monochrome-black.svg" alt="Groupomania"> </span>
        </router-link>
      
        <div class="search" >
            <input type="text" name="searchUser" id="searchUser"  @input="searchUser" placeholder="trouver un utilisateur ">
            <div class="getSearchUser" v-if="this.search">
                <ul >
                    <li v-for="user in getUsers" :key="user">
                        <router-link :to="{name:'userPage',params:{id: user.id}}" @click="clearSearch">{{user.nom}} {{user.prenom}}</router-link>

                    </li>
                    <li v-if="getUsers.length == 0"><p>aucun Utilisateur trouvé</p></li>
                </ul>
            </div>    
        </div>

        <div class="link-group">
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
  
    },
       data(){  
       return{
           userId : localStorage.getItem('userId'),
           search : false,   
        }
  },
  computed:{
      getUsers(){
        return this.$store.state.userStore.searchUsers
      }
  },
  methods:{
      goUserProfile(param){
          this.$router.push( {name:'userPage',params:{id: param} } )
      },
      clearSearch(){
            this.search = false
            document.getElementById('searchUser').value = "";
            return this.$store.commit('userStore/setUserList',[])

      },
    searchUser(){
        this.search = true
        let value = document.getElementById('searchUser').value.replace(/ /g, "")
        console.log(value)
        console.log(value.length)

        if(value.length == 0 ){
            this.clearSearch
            this.search = false
        }
        else(
            this.$store.dispatch('userStore/searchUser',value)
        )
    },
    signOut(){
        this.$store.dispatch('userStore/logOut')
    },
  },
}
</script>

<style scoped lang="scss">
.search{
    width: 30%;
    input{
        width: 100%;
        padding: 0.3rem;
    }
}
.getSearchUser{
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);

    width: 27%;
    text-align: center;
    background: #ffffff;
    box-shadow: 1px 5px 10px #100a217d;
    border-radius: 0 0 10px 10px;
    ul{
        list-style: none;
        padding: 0;
        margin: 0;
        font-weight: 600;
        a{
            color: rgb(0, 0, 0);

        }
        li:hover{
            background: #100a2128;
            cursor: pointer;
        }
    }
}

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