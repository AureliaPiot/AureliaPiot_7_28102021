<template>

<div class="post">
    <div class="headerPost d-flex">
       <p> {{post.id}}</p>
       <p> {{post.User.nom}}</p>
       <p> {{post.User.prenom}}</p>
       <p> {{Date(post.createDate).toString().slice(0,16)}}</p>
    </div>
    <div class="bodyPost">
        <p>
            {{post.content}}
        </p>
        <div class="imgPost" v-if="post.attachement !== 'null'">
            <img :src="post.attachement" alt="">
        </div>
    </div>
    <div class="footerPost d-flex align-items-center">
        <!-- <div class="row"> -->
            <div class="col like">Likes</div>
            <div class="col comments">Comments</div>
        <!-- </div> -->
    </div>    

</div>
<!-- User: {id: 1, nom: 'legend', prenom: 'xiao', email: 'Kingdom.hearts@disney.com', password: 'vv', …}
UserId: 1
attachement: "null"
content: "fesfs"
createDate: 2147483647
id: 1
like: 0 -->
   
</template>

<script>
export default {
    name:'singlePost',
    props: {
        post: Object
    },
    methods:{

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

    .headerPost{
        p{
            margin-right: 1rem;
        }
    }
    .bodyPost{
        
        min-height: 4rem;
        padding: 1rem;
        img{
            width: 80%;
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