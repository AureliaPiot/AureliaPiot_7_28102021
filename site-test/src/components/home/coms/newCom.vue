<template>
            <div id="newCom" class="newCom">

                <div class="form-group row justify-content-between ">
                
                    <img  v-bind:src="getUser.profilePic" alt="" class="userAvatar">
                    <input  type="text" class="form-control messageCom" :name="'messageCom'+postId" :id="'messageCom'+postId" placeholder="commentaire..."  v-on:keyup.enter.prevent="submitCom" :disabled="getUser.role =='mute' ? true : false">

                    <i class="fas fa-arrow-alt-circle-right submitCom"  v-on:click.prevent="submitCom"></i>


                </div>
            
            </div>
        
</template>

<script>
export default {
    name:'new_com',
    props: {
        userId : Number,
        postId : Number,

        query: String

    },
    data(){
        return{

        }
    },
    computed:{
        getUser(){
          return this.$store.state.userStore.user
        }
    },
     methods:{

         submitCom(){
            const content = document.getElementsByName("messageCom"+this.postId)[0]
            const inputEmpty = /[\S]+/;

            if(inputEmpty.test(content.value) == false ){
                content.classList.add('invalide');
                content.value="";

                setTimeout(function(){
                   content.classList.remove('invalide');
                }, 400);


                return console.log('input empty');
            }

            const userId = localStorage.getItem("userId");
            const data= {
                UserId: userId,
                PostId: this.postId ,
                content : content.value,                
                createDate :Date.now(),
             }
            this.$store.dispatch('postStore/newCom',{form : data, query : this.query});

            document.getElementById('messageCom'+this.postId).value=''

         },
     }
}
</script>

<style scoped lang="scss">
.invalide{
    border: 1px solid rgb(255, 0, 0);
}
#newCom{
    background: rgb(255, 255, 255);

    margin: 1rem;
    border-radius: 8px;

    .userAvatar{
        width: 4rem;
        border-radius: 50%;

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