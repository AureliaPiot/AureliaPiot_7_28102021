<template>
<div class="editPost">
    <div class="headerPost ">
       <div class="userData">
            <div class="user">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio iste vitae enim perspiciatis earum sequi a, dicta reiciendis animi est sunt distinctio, odio commodi corrupti, repudiandae dolore expedita. Omnis, nesciunt.</div>
       </div> <!-- userdata -->
    </div>
    <div class="bodyPost">
        <!-- <input type="text" name="editContent" :v-bind:value="post.content">
        <input type="file"  class="btn btn-outline-primary w30" id="file" name="file" v-bind:value="post.attachement"> -->
        <!-- <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis est laudantium expedita, voluptatem eum quis totam optio atque ipsum id doloribus similique animi necessitatibus recusandae? Ut aliquid inventore nulla beatae!</p> -->
        <p>{{ content }}</p>
        <p>{{ attachement }}</p>
    </div>
    <div class="footerPost d-flex align-items-center">
        <div>accept</div>
    </div>    


</div>

   
</template>

<script>

export default {
    name:'editPost',
    props: {
        // post: Object,
        user:Object,
        content:String,
        attachement:String,
    },

    methods:{
       
    },//methods




}
</script>

<style scoped lang="scss">
// gere le post en grid
.editPost{
    background: white;
    margin: 2rem 0;
    padding: 2rem;
    border-radius: 8px;
    position: absolute;
    top: -30px;
    left: 0;
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