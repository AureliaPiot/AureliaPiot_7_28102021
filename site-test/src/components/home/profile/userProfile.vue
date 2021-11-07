<template>
    <div>
        <div class="root">
            <h1 class="titre">{{userData.nom}} {{userData.prenom}}</h1>
            <img class="pic" v-bind:src="userData.profilePic" v-bind:alt="userData.nom">
            <div class="test" >
                <p>{{userData.email}}</p>
            </div>
        </div>
        <getPost :query="this.id" />
    </div>

<!--
email: "Kingdom.hearts@disney.com"
id: 2
nom: "legend"
prenom: "xiao"
profilePic: "http://localhost:3000/images/defaultPic/default.jpg"
role: "user"
-->


</template>

<script>
import getPost from '@/components/home/post/get_post.vue'

export default {
  name: 'user-profile',
    components:{
        getPost
    },
   data(){  
       return{
            userData :"",
            id :  this.$route.params.id,

        }
  },
  props: {
    user: String
  },
   methods:{
 
        getUserData(){
            const id =  this.id;

            console.log('get user data')
            console.log(this.$route.params.id)

            fetch('http://localhost:3000/api/user/'+id, {
                method : "Get",
                headers: { 
                    "Content-Type": "application/json",
                    "authorization" : 'Bearer ' + localStorage.getItem('token'), 
                },
            }) 
            .then(function(res){
                return res.json();
            })    
            .then(value => (this.userData = value, console.log(this.userData)))
            .catch(function(){
                console.log('erreur de requete');
            })
        },//getUsersdata

    },//methods
    beforeMount(){
        this.getUserData();
    },
  
}

</script>

<style scoped lang="scss">
.root{
    background: rgb(255, 255, 255);
    border-radius: 8px;
    .pic{
        width: 5rem;
        height: 5rem;
    }
    
    .test{
        height :10vw;
    }

}
h1{
    color: rgb(17, 52, 66);
}
.div{
    color: rgb(189, 35, 35);
}
</style>
