<template>
        <!-- <div v-on:click="getCom" class="com">{{data}}</div> -->
    <div  >
        <!-- <div v-for="coms in this.data" :key="coms"  class="coms" > -->
        <div  class="coms" >

            <div class="pp">
                <img v-bind:src="coms.User.profilePic" alt="">
            </div>

            <div class="userData d-flex">
                <!-- {{coms.User}} -->
                <router-link class=" d-flex " :to="{ name: 'userPage',params:{id: coms.User.id }}">
                    <p> {{coms.User.nom}}  </p>
                    <p>{{coms.User.prenom}} </p>
                </router-link>
                <p class="comDate">{{coms.createDate.substring(0,10)}}</p>
                <div class="editPost"  v-if="isCreator == coms.User.id || isAdmin ">
                    <i class="fas fa-pen iconEdit edit" @click.prevent="showEditCom"></i>
                    <i class="fas fa-trash iconEdit delete" @click.prevent="deleteCom(coms.id)"></i>
                    <!-- <button class="btn edit" @click.prevent="showEditCom"><i class="fas fa-pen text-white"></i></button>
                    <button class="btn delete" @click.prevent="deleteCom"><i class="fas fa-trash text-white"></i></button> -->
                </div>
            </div>

            <div  v-if="!this.editCom" class="content">{{coms.content}}</div>

            <div v-if="this.editCom" class="Editcontent">
                <input  type="text" class="" :name="'editCom'+coms.id" :value="coms.content">
                <i class="fas fa-arrow-alt-circle-right submitCom"  v-on:click.prevent="submitComEdit"></i>
                <!-- <button class="close" @click.prevent="showEditCom" >X</button> -->
            </div>

            <!-- <editComs v-if="this.editCom" @closeEditCom="showEditCom" :content="coms.content" id="coms.id"/> -->
           


        </div>
    </div>      
</template>

<script>
// import editComs from '@/components/home/coms/editComs.vue'

export default {
    name:'get_com',
    components:{
        // editComs
    },
    props: {
        coms: Object,
        // userPP :String,
        postId : Number,
        isCreator : String,
        isAdmin : Boolean,


    },
    data(){
        return{
            // data:"",
            token :localStorage.getItem("token"),
            editCom: false
        }
    },

    //  methods:{
        // mounted(){
                
        //         console.log('get com');
        //         console.log(this.postId);

    
        //         fetch('http://localhost:3000/api/com/post/'+this.postId, {
        //             method : "Get",
        //             headers: { 
        //                 "Content-Type": "application/json",
        //                 "authorization" : 'Bearer ' + this.token, 
        //             },
        //         }) 
        //         .then(function(res){
        //             return res.json();
        //         })    
        //         .then(value => (this.data = value , console.log(value) ))
       

        //         .catch(function(){
        //             console.log('erreur de requete');
        //         });
        //     console.log("data");

        // },
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

            submitComEdit(){
                // const dataform = new FormData();
                // dataform.append('content',document.getElementsByName("editCom")[0].value);
                // dataform.append('content','test');
                const editData ={
                    newContent : document.getElementsByName("editCom"+ this.coms.id)[0].value,

                }


                fetch('http://localhost:3000/api/com/'+this.coms.id, {
                    method : "Put",
                    headers: { 
                        "Content-Type": "application/json", 
                        "authorization" : 'Bearer ' + localStorage.getItem('token'),
                        },
                    body: JSON.stringify(editData),
                }) 
                .then(function(res){return res.json();}) 
                .then(value => (console.log(value) ))
                .catch(function(){ console.log('erreur de requete'); })
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
        height: 3rem;
        border-radius:50% ;
        object-fit: cover;

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
.editPost{
    .iconEdit{
        margin: 0 0.5rem;
    }
    .edit{
        color: #9e9053;
    }
    .delete{
        color: #ba1111;
    }
}
.Editcontent{
    .submitCom{
        font-size: 1.5rem
    }
}
@media (max-width: 577px) {
    .coms{
        padding: 0.5rem ;
    }
}

</style>