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
                <router-link class=" d-flex usernamePost " :to="{ name: 'userPage',params:{id: coms.User.id }}">
                    <p>{{coms.User.nom}} </p>
                    <p>{{coms.User.prenom}}</p>
                    <i class="fas fa-crown"  v-if="this.coms.User.role == 'admin'" ></i>
                </router-link>
                <p class="comDate">{{coms.createDate.substring(0,10)}}</p>
                <div class="editPost"  v-if="isCreator == coms.User.id  || isAdmin  ">
                    <i class="fas fa-pen iconEdit edit" v-if="this.isCreator == coms.User.id" @click.prevent="showEditCom"></i>
                    <i class="fas fa-trash iconEdit delete" @click.prevent="deleteCom(coms.id)"></i>
                    <!-- <button class="btn edit" @click.prevent="showEditCom"><i class="fas fa-pen text-white"></i></button>
                    <button class="btn delete" @click.prevent="deleteCom"><i class="fas fa-trash text-white"></i></button> -->
                </div>
            </div>

            <div  v-if="!this.editCom" class="content">{{coms.content}}</div>

            <div v-if="this.editCom" class="Editcontent">
                <input  type="text" class="" :name="'editCom'+coms.id" :value="coms.content" v-on:keyup.enter.prevent="submitComEdit(coms.id)">
                <i class="fas fa-arrow-alt-circle-right submitCom"  v-on:click.prevent="submitComEdit(coms.id)"></i>
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
        isCreator : Number,
        isAdmin : Boolean,
     

        query: String



    },
    data(){
        return{
            // data:"",
            token :localStorage.getItem("token"),
            editCom: false,
        }
    },
    computed:{
  

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

        submitComEdit(param){
              const editData ={
                newContent : document.getElementsByName("editCom"+ this.coms.id)[0].value,

            }
            this.$store.dispatch('postStore/updateCom',{id : param, data:editData , query : this.query});

            this.editCom = false

        },

        deleteCom(param){
            console.log('deleteCom');
            console.log(param);

            this.$store.dispatch('postStore/deleteCom',{id : param, query : this.query});

        }
    }

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
    .usernamePost{
        color: rgb(0, 0, 0);
    }
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