<template>

        <form id="newCom" class="form-inline newCom" enctype="multipart/form-data">


            <div class="form-group row justify-content-between">
               
                <img  v-bind:src="this.profilePic" alt="" class="userAvatar">
                <input  type="text" class="form-control messageCom" :name="'messageCom'+postId" :id="'messageCom'+postId" placeholder="commentaire...">

                <i class="fas fa-arrow-alt-circle-right submitCom"  v-on:click.prevent="submitCom"></i>


            </div>
            

        </form>
        
</template>

<script>
export default {
    name:'new_com',
    props: {
        userPP :String,
        userId : Number,
        postId : Number,

        query: String

    },
    data(){
        return{
            profilePic : this.userPP
        }
    },
     methods:{
         submitCom(){
            const userId = localStorage.getItem("userId");
            // const token =localStorage.getItem("token"); 
            const data= {
                UserId: userId,
                PostId: this.postId ,
                content : document.getElementsByName("messageCom"+this.postId)[0].value,                
                createDate :Date.now(),
             }
            console.log(data)

            // const dataform = new FormData();
            // dataform.append('PostId',data.PostId);
            // dataform.append('UserId',data.UserId);
            // dataform.append('content',data.content);

            // const form = dataform

            this.$store.dispatch('postStore/newCom',{form : data, query : this.query});

            document.getElementById('messageCom'+this.postId).value=''

         },
     }
}
</script>

<style scoped lang="scss">
#newCom{
    background: rgb(255, 255, 255);
    // width: 100%;
    margin: 1rem;
    border-radius: 8px;
    // margin-bottom: 2rem;
    .userAvatar{
        width: 4rem;
        // height: 1rem;
        border-radius: 50%;
        // background: yellow;
    }
    .submitCom{
        margin: 0;
        font-size: 2rem;
        padding: 0;
        width: min-content;
    }
}
.messageCom{
    width: 70%;
}
.w30{
    width: 30%;
    background: rgba(0, 0, 255, 0.034);
}

@media (max-width: 350px) {
 .messageCom{
     width: 55%;
 }

}
</style>