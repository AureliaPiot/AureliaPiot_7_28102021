<template>
        <!-- <div v-on:click="getCom" class="com">{{data}}</div> -->
    <div  >
        <div v-for="coms in this.data" :key="coms"  class="coms" >

            <div class="pp">
                <img v-bind:src="coms.User.profilePic" alt="">
            </div>
            <div class="userData d-flex">
                <!-- {{coms.User}} -->
                <router-link class=" d-flex " :to="{ name: 'userPage',params:{id: coms.User.id }}">
                    <p> {{coms.User.nom}}  </p>
                    <p>{{coms.User.prenom}} </p>
                </router-link>
                <p class="comDate">{{coms.createDate}}</p>
                <div class="editPost"  v-if="isCreator == coms.User.id || isAdmin ">
                    <i class="fas fa-pen "></i>
                    <i class="fas fa-trash "></i>
                    <!-- <button class="btn edit" @click.prevent="showEditCom"><i class="fas fa-pen text-white"></i></button>
                    <button class="btn delete" @click.prevent="deleteCom"><i class="fas fa-trash text-white"></i></button> -->
                </div>
            


            </div>
            <div class="content">{{coms.content}}</div>

        </div>
    </div>

<!-- PostId: 3
PostId: 1
User:
    email: "ranchLonllon@Nael.com"
    id: 1
    nom: "Nael"
    password: "vv"
    prenom: "Lonlon"
    profilePic: "http://localhost:3000/images/defaultPic/default.jpg"
    role: "user"

UserId: 1
content: "bbbb"
createDate: "2021-11-10T12:04:52.000Z"
id: 4
-->

        
</template>

<script>
export default {
    name:'get_com',
    props: {
        // userPP :String,
        postId : Number,
        isCreator : String,
        isAdmin : Boolean,


    },
    data(){
        return{
            data:"",
        }
    },
    created(){
            console.log('this.data');

            console.log(this.data);

    },
    
    //  methods:{
        mounted(){
                const token =localStorage.getItem("token"); 
                console.log('get com');
                console.log(this.postId);

    
                fetch('http://localhost:3000/api/com/post/'+this.postId, {
                    method : "Get",
                    headers: { 
                        "Content-Type": "application/json",
                        "authorization" : 'Bearer ' + token, 
                    },
                }) 
                .then(function(res){
                    return res.json();
                })    
                .then(value => (this.data = value , console.log(value) ))
       

                .catch(function(){
                    console.log('erreur de requete');
                });
            console.log("data");

        }
    //  },
    //  beforeMount(){
    //     this.getComs()
    //  }
}
</script>

<style scoped lang="scss">
.com{
width: 100%;
min-height:10rem; 
background: orange; 
}
.coms{
    width: 100%;
    display: grid;
    grid-template-columns: 3rem 1fr;
    grid-template-areas: "pp userData"
                         "pp content";
    grid-gap: 0.5rem 1rem;
    padding: 1rem 3.5rem;
    border-top: 1px solid #dfdfdf ;

}
.pp{
    grid-area: pp;
    img {
        width: 100%;
        // height: 3rem;
        border-radius:50% ;
    }
}
.userData{
    grid-area: userData;
    p{
        margin: 0 0.3rem;
    }
    .comDate{
        grid-area: comDate;
        font-size: 0.7rem;
    }
}
.content{
    grid-area: content;
    word-wrap: break-word;

}
</style>