<template>

<div class="post">
    <div class="headerPost d-flex">
       
        <!-- <div class="profilePic"> -->
            <img class="profilePic" v-bind:src="post.User.profilePic" alt="">
        <!-- </div> -->
        <router-link :to="{ name: 'userPage',params:{id: post.User.id }}">{{post.User.nom}}</router-link>

       <p> {{post.User.prenom}}</p>
       <p> {{Date(post.createDate).toString().slice(0,16)}}</p>

        <div class="edit"  v-if="this.isCreator == post.UserId">
            <button class="edit">edit</button>
            <!-- ouvre affiche un composant qui recupere les donnéés dans le form  /comme une fenetre alert?-->
            <button class="delete" @click.prevent="deletePost">delete</button>
            <!-- ouvre affiche un composant qui recupere les donnéés dans le form -->
        </div>

    </div>
    <div class="bodyPost">
        <p>
            {{post.content}}
        </p>
        <!-- <div class="imgPost" > -->
            <img v-if="post.attachement !== 'null'" class="imgPost" :src="post.attachement" alt="">
        <!-- </div> -->
    </div>
    <div class="footerPost d-flex align-items-center">
        <!-- <div class="row"> -->
            <!-- <div class="col like">{{this.like}}</div> -->
            <div class="col ">{{ this.like}}</div>
            <div class="col comments">Comments</div>
        <!-- </div> -->
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
            postLike : this.post.like,
             like : "",
            


        }
    },
    mounted(){
        // console.log(this.isCreator);
        // console.log(this.post.UserId)

        // console.log(JSON.parse(this.postLike).userLike);
        const parse = JSON.parse(this.postLike).userLike;
        this.like = parse.length;
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
    img{
        width: 100%;
        height: 100%;
    }

    .headerPost{
        p{
            margin-right: 1rem;
        }
        .profilePic{
            width: 3rem;
            // height: 1rem;
        }
    }
    .bodyPost{
        
        min-height: 4rem;
        padding: 1rem;
        .imgPost{
            width: auto;
            max-height: 30vw;
            max-width: 80%;

        }

    }
    .footerPost{
        text-align: center;
        min-height: 4rem;
        background: rgb(237, 240, 243);
        border-top: 1px solid rgb(223, 223, 223);
        border-bottom: 1px solid rgb(223, 223, 223);




    }

}
</style>