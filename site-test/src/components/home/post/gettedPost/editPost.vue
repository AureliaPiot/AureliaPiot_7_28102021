<template>
<div class="editPost">
    <div class="headerPost ">
       <div class="userData">
            <div class="user"></div>          
            <button class="close" v-on:click="$emit('showEdit')" >X</button>
       </div> <!-- userdata -->
    </div>
    <div class="bodyPost">
        <textarea class="form-control" id="message" rows="3" name="messageEdit" :value="content"></textarea>

        <img  v-if="attachement !== 'null'" :src="attachement" alt="upload img">
        
        <!-- <p>{{ content }}</p>
        <p>{{ attachement }}</p> -->
    </div>
    <div class="footerPost d-flex justify-content-between">
        <input type="file"  class="btn btn-outline-primary" id="file" name="fileEdit" >
        <!-- <div>entrée</div> -->
        <button class="btn btn-primary w30">entrée</button>
    </div>    


</div>

   
</template>

<script>

export default {
    name:'editPost',
    props: {
        // post: Object,
        id: Number,
        User:Object,
        content:String,
        attachement:String,
    },

    methods:{
       close(){
           this.$emit("showEdit");
           console.log('close');
       }
    },//methods




}
</script>

<style scoped lang="scss">
// gere le post en grid
.editPost{
    position: absolute;
    z-index: 5;
    top: 65px;
    left: 0;
    width: 100%;
    background: white;
    margin: 2rem 0;
    padding: 2rem;
    border-radius: 8px;
    img{
        width: 50%;
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
    .close{
        position: absolute;
        top: 10px;
        right: 10px;

        background: rgb(158, 11, 11);
        color: rgb(255, 255, 255);
        font-weight: 900;
    }

}
</style>