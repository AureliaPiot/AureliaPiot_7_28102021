<template>

<div class="post">
    <div class="headerPost ">
       <div class="userData">

        <!-- <div class="profilePic"> -->
        <img class="profilePic" v-bind:src="post.User.profilePic" alt="">
        <!-- </div> -->
        <router-link class="name" :to="{ name: 'userPage',params:{id: post.User.id }}">{{post.User.nom}}</router-link>

       <!-- <p class="name"> {{post.User.prenom}}</p> -->
       <p class="date"> {{Date(post.createDate).toString().slice(0,16)}}</p>

       </div>
        <div class="editPost"  v-if="this.isCreator == post.UserId || this.isAdmin ">
            <button class="btn  edit"><i class="fas fa-pen text-white"></i></button>
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

            <div class="col comments"><i class="fas fa-comment-dots"></i>Comments</div>
            <div class="col "><i class="fas fa-thumbs-up"></i>{{ this.like}}</div>

    </div>    

</div>

   
</template>

<script>
export default {
    name:'singlePost',
    props: {
        post: Object
    },
    data(){  
        return{
            isCreator :localStorage.getItem('userId'),
            isAdmin: localStorage.getItem('role') == "admin",
            // postLike : this.post.like,
             like : "nbr:0",
            


        }
    },
    mounted(){
        // console.log(this.isCreator);
        // console.log(this.post.UserId)

        // console.log(JSON.parse(this.postLike).userLike);
        // const parse = JSON.parse(this.postLike).userLike;
        // this.like = parse.length;
    },

    methods:{
        deletePost(){
            if(confirm('you sure ?')){
                console.log('delete');
                
                // const userId = localStorage.getItem("userId");
                const token =localStorage.getItem("token"); 

                fetch('http://localhost:3000/api/post/'+this.post.id, {
                    method : "DELETE",
                    headers: {
                        "Content-Type": "application/json" ,
                        "authorization" : 'Bearer ' + token,
                        },
                    // body: JSON.stringify(data),
                    // body: userId,

                    // file:file
                }) 
                .then(function(res){return res.json();}) 
                .then(value => (console.log(value) ))
                .catch(function(){
                    console.log('erreur de requete');
                })
            }
        }

    },//methods




}
</script>

<style scoped lang="scss">
// gere le post en grid
.post{
    background: white;
    margin: 2rem 0;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 0px 10px #0000004d;
    display:grid;
    grid-template-columns: 1fr 1fr;
    //   grid-template-rows: 4vw 1fr;
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
        border-bottom: 1px solid rgb(223, 223, 223);

    }

}
</style>