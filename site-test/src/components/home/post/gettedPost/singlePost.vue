<template>

<div class="getPost">

    <div class="post">
        <div class="headerPost ">
            <div class="userData">
                <img class="profilePic --round" v-bind:src="this.UserProfilePic" v-bind:alt="this.UserNom">
                <router-link class="name" :to="{ name: 'userPage',params:{id: this.UserId }}">{{this.UserNom}}  {{this.UserPrenom}} <i class="fas fa-crown" v-if="this.UserRole == 'admin'" ></i> </router-link>
                <p class="date"> {{ this.createDate }}</p>
            </div>
            <div class="editPost"  v-if="this.isCreator == this.UserId || this.isAdmin ">
                <button class="btn --edit m-3" v-if="this.isCreator == this.UserId && this.UserRole !== 'mute'" @click.prevent="showEdit"><i class="fas fa-pen text-white"></i></button>
                <!-- ouvre affiche un composant qui recupere les données dans le form  -->
                <button class="btn --delete " @click.prevent="deletePost"><i class="fas fa-trash text-white"></i></button>
                <!-- affiche une alerte avant la suppression du post -->
            </div>
        </div>
        <div class="bodyPost">
            <p>{{this.content}}</p>
            <img v-if="this.attachement !== 'null'" class="imgPost" :src="this.attachement" alt="post_img">
        </div>
        <div class="footerPost d-flex align-items-center">
                <div class="col "><i v-bind:class="{ 'valide' : this.like } " class="fas fa-thumbs-up like" @click="addLike"></i> <p>{{ this.Postlikes}} </p></div>
                <div class="col comments"><i class="fas fa-comment-dots comment"></i> <p>{{ getAllComs.length}}</p> </div>
        </div>   
        
        <div class="showEdit" v-if="this.show">
            <div class="backgroundCache"></div>
            
            <editPost 
                @close ="closeEdit"
                :user ='post.User'
                :content ='post.content' 
                :attachement ='post.attachement'
                :id="post.id"
                :query="this.query" />

        </div>

    </div>

        <newCom v-if="role !=='mute'"
            :userId ="post.User.id"
            :postId="post.id"
            :query="this.query"
            /> 

        <getComs  
            v-for="coms in getAllComs" 
            :key="coms"
            :coms="coms"
            :query="query"


           :postId="post.id" 
           :isCreator="this.isCreator" 
           :isAdmin="this.isAdmin" 
           /> 

</div>

   
</template>

<script>
import editPost from '@/components/home/post/gettedPost/editPost.vue'
import newCom from '@/components/home/coms/newCom.vue'
import getComs from '@/components/home/coms/getComs.vue'


export default {
    name:'singlePost',
    props: {
        post: Object,
        query: String

    },
    components:{
        editPost,
        newCom,
        getComs,
    },

    data(){  
        return{
            token : localStorage.getItem("token"),
            isCreator :localStorage.getItem('userId'),
            isAdmin: localStorage.getItem('role') == "admin",
            role: localStorage.getItem('role'),


            show : false,
            like :false,

            id: this.post.id ,
            attachement: this.post.attachement ,
            content: this.post.content ,
            createDate: new Date(this.post.createDate).toLocaleDateString('fr-FR', {  year: 'numeric', month: 'long', day: 'numeric' }),
            Postlikes: this.post.likes.length ,
            PostComs: this.post.Coms.length ,

            
            UserId: this.post.UserId ,
            UserBio: this.post.User.bio,
            UserEmail: this.post.User.email,
            UserNom: this.post.User.nom,
            UserPrenom: this.post.User.prenom,
            UserProfilePic: this.post.User.profilePic,
            UserRole: this.post.User.role,
  
        }
    },
    computed: {
       
        getAllComs(){
            return this.$store.state.postStore.coms.filter(com => com.PostId == this.id)
        }  
    },
    created(){     
        for(let like of this.post.likes){
            if(like.UserId == this.isCreator)
            {
                this.like = true;
            }
        }
        // boucle qui verifie si l'user connecté a liker le post
    },

    methods:{

        showEdit(){
            this.show = true
        //    console.log(this.show)
        },
        closeEdit(){
            this.show = false
            // console.log(this.show)
        },

        savePost(){
            console.log('pos edit')
        },
        deletePost(){
            if(confirm('êtes vous certain de vouloir supprimer cette publication ?')){
                console.log('delete');
                this.$store.dispatch('postStore/deletePost',{id:this.post.id,query:this.query});
            }
        },

        addLike(){
            if(this.role == 'mute')
            {
                console.log('action non autorisée')
            }
            else{
                if(!this.like){
                    this.Postlikes ++;
                        console.log('like');
                    const data ={
                        UserId:this.isCreator,
                        postId:this.post.id
                    }
                this.$store.dispatch('postStore/addLike',data);

                    this.like = true
                    return

                }
                if(this.like){
                    this.Postlikes --;1

                    console.log('unlike');

                    this.$store.dispatch('postStore/unLike',{id: this.post.id, form :this.isCreator });
                    this.like = false 

                }
            }

        },
    },//methods




}
</script>

<style scoped lang="scss">
.valide{
    color: rgba(0, 138, 252, 0.85);
}
.not{
    color: rgba(9, 44, 73, 0.603);

}

.getPost{
    background: white;
    margin: 2rem 0;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 0px 10px #0000004d;
}
.post{
    position: relative;
    border-bottom:1px solid rgb(138, 138, 138);

    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "header header"
                        "body body"
                        "footer footer";
    // img{
    //     width: 100%;
    //     height: 100%;
    // }

    .headerPost{
    grid-area: header;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 4vw;
    grid-template-areas: "userData editPost";

        .userData{
        grid-area: userData;
        display:grid;
        grid-template-columns: 1fr 3fr;
        min-height: 4vw;
        grid-column-gap: 1rem;
        grid-template-areas: "pic name "
                             "pic date"   ;

        }
        .name{
        grid-area: name;
        // color: rgb(0, 0, 0);
        font-weight: 600;

        }
        .date{
        grid-area: date;

        }
        .profilePic{
        grid-area: pic;

            width: 4rem;
            height: 4rem;
            // border-radius: 50%;
        }
        .editPost{
            grid-area: editPost;
            justify-self: flex-end;

            .edit{
                margin-right: 3rem ;
            }
            // .delete{
            //     background: #ba1111;
            // }
        }

        p{
            margin-right: 1rem;
        }

    }
    .bodyPost{
        grid-area: body;      
        display: flex;
        flex-direction: column;

        min-height: 4rem;
        padding: 1rem;
        .imgPost{
            width: auto;
            max-height: 30rem;
            max-width: 100%;
            align-self: center;

        }

    }
    .footerPost{
        grid-area: footer;
        margin: 0.5rem ;
        min-height: 3rem;
        text-align: center;
        font-size: 2rem;
        border-top: 1px solid  darken($ligth_theme_Color_terciary,10%);

        color: darken($ligth_theme_Color_primary,10%);

        p{
            display: inline;
            font-size: 1rem;
            font-weight: 100;
        }

    }

}
.backgroundCache{
    position: fixed;
    z-index: 4;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #8080808a;
    backdrop-filter: blur(2px) grayscale(30%);

}
@media (max-width: 767px) {
    .date{
         font-size:0.8rem;
    }
}
@media (max-width: 577px) {
    .headerPost{
        grid-template-columns: 1fr !important;
        grid-template-rows: 1fr  !important;
        grid-row-gap: 0.5rem;

        grid-template-areas: "editPost"
                            "userData" !important;
        .editPost{
            justify-self: center;
        }
    }
    .getPost{
        padding: 2rem 0.5rem ;
        background: white;
        margin: 0;
        border-radius: 0;
        box-shadow: none;
        border-top:2px solid #1f4988;
    }
}
</style>