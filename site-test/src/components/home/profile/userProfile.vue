<template>
    <div>
        <div class="root">

            <div class="row">
                <h1 class="titre">{{userData.nom}} {{userData.prenom}}</h1>
                <input v-if="this.editName" type="text" class="form-control" id="nom_input"  placeholder="nom" name="nom_Edit"  v-bind:value="userData.nom" required>
                <input v-if="this.editName" type="text" class="form-control" id="prenom_input"  placeholder="prenom" name="prenom_Edit" v-bind:value="userData.prenom"  required>

                <button class="edit" v-if="this.isUser == userData.id" @:click.prevent="editUserName">edit</button>
            </div>

            <img class="pic" v-bind:src="userData.profilePic" v-bind:alt="userData.nom">
            <div class="test" >
                <p>{{userData.email}}</p>
            </div>
             <div class="edit"  v-if="this.isUser == userData.id">
                <button class="edit">edit</button>
                <!-- ouvre affiche un composant qui recupere les donnéés dans le form  /comme une fenetre alert?-->
                <button class="delete" @click.prevent="deleteUser">delete</button>
                <!-- redirection vers le page de connexion-->
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
            isUser :localStorage.getItem('userId'),
            userData :"",
            id :  this.$route.params.id,

            editName : false,
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

        editUserName(){
            this.editName = true

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
