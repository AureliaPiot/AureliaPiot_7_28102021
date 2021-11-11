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
                    <i class="fas fa-pen" @click.prevent="showEditCom"></i>
                    <i class="fas fa-trash " @click.prevent="deleteCom(coms.id)"></i>
                    <!-- <button class="btn edit" @click.prevent="showEditCom"><i class="fas fa-pen text-white"></i></button>
                    <button class="btn delete" @click.prevent="deleteCom"><i class="fas fa-trash text-white"></i></button> -->
                </div>
            </div>

            <div  v-if="!this.editCom" class="content">{{coms.content}}</div>
            <!-- <div v-if="this.editCom" class="Editcontent">
                <input  type="text" class="" :name="'editCom'+coms.id" :value="coms.content">
                <i class="fas fa-arrow-alt-circle-right submitCom"  v-on:click.prevent="submitEditCom"></i>
                <button class="close" @click.prevent="showEditCom" >X</button>

            </div> -->

            <editComs v-if="this.editCom" @closeEditCom="showEditCom" content="coms.content" id="coms.id"/>


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
import editComs from '@/components/home/coms/editComs.vue'

export default {
    name:'get_com',
    components:{
        editComs
    },
    props: {
        // userPP :String,
        postId : Number,
        isCreator : String,
        isAdmin : Boolean,


    },
    data(){
        return{
            data:"",
            token :localStorage.getItem("token"),
            editCom: false
        }
    },

    //  methods:{
        mounted(){
                
                console.log('get com');
                console.log(this.postId);

    
                fetch('http://localhost:3000/api/com/post/'+this.postId, {
                    method : "Get",
                    headers: { 
                        "Content-Type": "application/json",
                        "authorization" : 'Bearer ' + this.token, 
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

        },
        methods:{
            showEditCom(){
                if(this.editCom){
                    this.editCom = false
                    console.log('editcom close')
                }else{
                    this.editCom = true
                    console.log('editcom open')
                }
            },
            deleteCom(param){
                console.log('deleteCom');
                console.log(param);

                fetch('http://localhost:3000/api/com/'+param, {
                    method : "DELETE",
                    headers: { 
                        "Content-Type": "application/json",
                        "authorization" : 'Bearer ' + this.token, 
                    },
                }) 
                .then(function(res){return res.json(); })    
                .then(value => (console.log(value.message) ))
                .catch(function(){console.log('erreur de requete');});
            }
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