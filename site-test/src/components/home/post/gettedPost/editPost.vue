<template>

<div class="post">
    <div class="headerPost d-flex">
       
        <div class="profilePic">
            <!-- <img v-bind:src="none" alt=""> -->

        </div>


    <div class="bodyPost">
        <!-- reprendre les donnée entrée et dans un champ textarea value: value et enregistrer -->
        <!-- <p>
            {{post.content}}
        </p>

        reprendre les donnée de l'input avec value et  enregistrer
        <div class="imgPost" v-if="post.attachement !== 'null'">
            <img :src="post.attachement" alt="">
        </div> -->
    </div>


    <div class="footerPost d-flex align-items-center">

            <div class="col like">Likes</div>
            <div class="col comments">Comments</div>

    </div>    

</div>

   
</template>

<script>
export default {
    name:'singlePost',
    props: {
        post: Object
    },
    methods:{
        deletePost(){
            if(confirm('you sure ?')){
                console.log('delete');
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
            max-width: 80%;
            max-height: 30vw;
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