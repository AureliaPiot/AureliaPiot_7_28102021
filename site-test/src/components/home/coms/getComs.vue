<template>


        <div  class="coms" >

            <div class="pp">
                <img class="--round" v-bind:src="coms.User.profilePic" alt="">
            </div>

            <div class="userData d-flex">

                <router-link class=" d-flex usernamePost " :to="{ name: 'userPage',params:{id: coms.User.id }}">
                    <p>{{coms.User.nom}} </p>
                    <p>{{coms.User.prenom}}</p>
                    <i class="fas fa-crown"  v-if="this.coms.User.role == 'admin'" ></i>
                </router-link>

                <p class="comDate">{{this.createDate}}</p>

                <div class="editCom" >

                    <i class="fas fa-pen iconEdit --text-edit" v-if=" isCreator == coms.User.id && coms.User.role !=='mute'" @click.prevent="showEditCom"></i>
                    
                    <i class="fas fa-trash iconEdit --text-delete"  v-if="isCreator == coms.User.id || isAdmin " @click.prevent="deleteCom(coms.id)"></i>

                </div>
            </div>

            <div  v-if="!this.editCom" class="content">{{coms.content}}</div>

            <div v-if="this.editCom" class="Editcontent">
                <input  type="text" class="inputEditCom" :name="'editCom'+coms.id" :value="coms.content" v-on:keyup.enter.prevent="submitComEdit(coms.id)">
                <i class="fas fa-chevron-right  submitCom"  v-on:click.prevent="submitComEdit(coms.id)"></i>

            </div>

        </div>


</template>

<script>


export default {
    name:'get_com',
    components:{

    },
    props: {
        coms: Object,

        postId : Number,
        isCreator : String,
        isAdmin : Boolean,

        query: String



    },
    data(){
        return{
            token :localStorage.getItem("token"),
            editCom: false,
            createDate: new Date(this.coms.createDate).toLocaleDateString('fr-FR', {  year: 'numeric', month: 'numeric', day: 'numeric' , hour:'numeric', minute:'numeric' }),
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
            const inputEmpty = /[\S]+/;
      
              const editData ={
                newContent : document.getElementsByName("editCom"+ this.coms.id)[0].value,
            }
            if(inputEmpty.test(editData.newContent) == false ){
                this.$store.dispatch('postStore/deleteCom',{id : param, query : this.query});
                return console.log('[commentaire vide, suppresion du commentaire]')

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
.coms{
    width: 100%;
    display: grid;
    grid-template-columns: 3rem 1fr;
    grid-template-areas: "pp userData"
                         "pp content";
    grid-gap: 0.5rem 1rem;
    padding: 1rem 3.5rem;
    border-top: 1px solid darken($ligth_theme_Color_terciary,10%)  ;

}
.pp{
    grid-area: pp;
    img {
        height: 3rem;
        // border-radius:50% ;
    }
}
.userData{
    grid-area: userData;
    align-items: center;
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
.editCom{
    .iconEdit{
        margin: 0 0.5rem;
    }
}
.Editcontent{
    .inputEditCom{
        width: 90%;
    }
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