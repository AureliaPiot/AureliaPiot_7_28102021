<template>

<div class="getPost">

    <div class="post">
        <div class="headerPost ">
            <div class="userData">
                <img class="profilePic" v-bind:src="post.User.profilePic" v-bind:alt="post.User.nom">
                <router-link class="name" :to="{ name: 'userPage',params:{id: post.User.id }}">{{post.User.nom}}</router-link>
                <p class="date"> {{Date(post.createDate).toString().slice(0,16)}}</p>
            </div>
            <div class="editPost"  v-if="this.isCreator == post.UserId || this.isAdmin ">
                <button class="btn  edit" @click.prevent="showEdit"><i class="fas fa-pen text-white"></i></button>
                <!-- ouvre affiche un composant qui recupere les donnéés dans le form  /comme une fenetre alert?-->
                <button class="btn  delete" @click.prevent="deletePost"><i class="fas fa-trash text-white"></i></button>
                <!-- ouvre affiche un composant qui recupere les donnéés dans le form -->
            </div>
        </div>
        <div class="bodyPost">
            <p>{{post.content}}</p>
            <img v-if="post.attachement !== 'null'" class="imgPost" :src="post.attachement" alt="">
        </div>
        <div class="footerPost d-flex align-items-center">
                <div class="col "><i v-bind:class="{ 'valide' : this.like } " class="fas fa-thumbs-up like" @click="addLike"></i> <p>{{ this.post.likes.length}} </p></div>
                <div class="col comments"><i class="fas fa-comment-dots comment"></i> <p>{{ this.post.Coms.length}}</p> </div>
        </div>   
        
        <div class="showEdit" v-if="this.show">
            <div class="backgroundCache"></div>
            <editPost 
                v-on:click="showEdit"
                :user ='post.User'
                :content ='post.content' 
                :attachement ='post.attachement'
                :id="post.id" />
        </div>
    </div>

        <newCom 
            :userId ="post.User.id"
            :postId="post.id"

            /> 

           <getComs  
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
        post: Object
    },
    components:{
        editPost,
        newCom,
        getComs,
    },

    data(){  
        return{
            token : localStorage.getItem("token"),
            show : false,
            isCreator :localStorage.getItem('userId'),
            isAdmin: localStorage.getItem('role') == "admin",

            like :false,
             
        }
    },
    created(){
// validateur like
        for(let like of this.post.likes){
            if(like.UserId == this.isCreator)
            {
                this.like = true;
            }
        }
    },

    methods:{
        showEdit(){
            if(this.show){
                this.show = false
            }else if(!this.show){
                this.show = true ;
            }
           console.log(this.show)
        },
        saveEdit(){

        },
        savePost(){
            console.log('post edit')
        },
        deletePost(){
            if(confirm('you sure ?')){
                console.log('delete');
                fetch('http://localhost:3000/api/post/'+this.post.id, {
                    method : "DELETE",
                    headers: {
                        "Content-Type": "application/json" ,
                        "authorization" : 'Bearer ' + this.token,
                        },
                }) 
                .then(function(res){return res.json();}) 
                .then(value => (console.log(value) ))
                .catch(function(){
                    console.log('erreur de requete');
                })
            }
        },

        addLike(){
 

            if(!this.like){
                    console.log('like');
                const data ={
                    UserId:this.post.User.id,
                    postId:this.post.id
                }

                fetch('http://localhost:3000/api/like/post', {
                    method : "POST",
                    headers: {
                        "Content-Type": "application/json" ,
                        "authorization" : 'Bearer ' + this.token,
                        },
                    body: JSON.stringify(data),

                }) 
                .then(function(res){return res.json();}) 
                .then(value =>(
                    console.log(value),
                    this.like = true
                ))
                .catch(function(){
                    console.log('erreur de requete');
                })
            }

            if(this.like){
                console.log('unlike');
                    // this.like = false
                fetch('http://localhost:3000/api/like/'+this.post.id+'/'+this.isCreator, {
                    method : "DELETE",
                    headers: {
                        "Content-Type": "application/json" ,
                        "authorization" : 'Bearer ' + this.token,
                        },
                }) 
                .then(function(res){return res.json();}) 
                .then(value =>(console.log(value),this.like = false ))
                .catch(function(){
                    console.log('erreur de requete');
                })

            }
        },


    },//methods




}
</script>

<style scoped lang="scss">
.valide{
    color: rgba(60, 120, 170, 0.603);
}
.not{
    color: rgba(9, 44, 73, 0.603);

}
// gere le post en grid
.getPost{
    background: white;
    margin: 2rem 0;
        padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 0px 10px #0000004d;
}
.post{
    position: relative;
    // padding: 2rem;
    border-bottom:1px solid rgb(138, 138, 138);

    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "header header"
                        "body body"
                        "footer footer";
    img{
        width: 100%;
        height: 100%;
    }

    .headerPost{
    grid-area: header;
    // background-color:rgba(0, 0, 255, 0.26) ;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 4vw;
    grid-template-areas: "userData editPost";

        .userData{
        grid-area: userData;
        display:grid;
        grid-template-columns: 1fr 3fr;
        min-height: 4vw;
        grid-template-areas: "pic name "
                             "pic date"   ;

        }
        .name{
        grid-area: name;

        }
        .date{
        grid-area: date;

        }
        .profilePic{
        grid-area: pic;

            width: 4rem;
            height: 4rem;
            border-radius: 50%;
        }
        .editPost{
            grid-area: editPost;
            justify-self: flex-end;

            .edit{
                background: #eed155;
                margin-right: 3rem ;
            }
            .delete{
                background: #ba1111;
            }
        }

        p{
            margin-right: 1rem;
        }

    }
    .bodyPost{
        grid-area: body;
        // background-color:rgba(51, 255, 0, 0.26) ;
        
        display: flex;
        flex-direction: column;

        min-height: 4rem;
        padding: 1rem;
        .imgPost{
            width: auto;
            max-height: 30vw;
            max-width: 100%;
            align-self: center;

        }

    }
    .footerPost{
        grid-area: footer;
        // background-color:rgba(255, 166, 0, 0.26) ;

        text-align: center;
        min-height: 3rem;
        // background: rgb(237, 240, 243);
        border-top: 1px solid rgb(223, 223, 223);
        // border-bottom: 1px solid rgb(223, 223, 223);

        // .like, .comment {
            font-size: 2rem;
            margin: 0.5rem ;
        // }
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
</style>