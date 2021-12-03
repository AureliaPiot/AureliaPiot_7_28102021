<template>
            <div id="newCom" class="newCom">
               
                    <img  v-bind:src="getUser.profilePic" alt="" class="userAvatar --round">
                    <input  type="text" class="form-control messageCom" :name="'messageCom'+postId" :id="'messageCom'+postId" placeholder="commentaire..."  v-on:keyup.enter.prevent="submitCom" >

                    <i class="fas fa-chevron-right submitCom"  v-on:click.prevent="submitCom"></i>

            
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
                content.classList.add('--invalide');
                content.value="";

                setTimeout(function(){
                   content.classList.remove('--invalide');
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

            document.getElementById('messageCom'+this.postId).value='';

         },
     }
}
</script>

<style scoped lang="scss">

#newCom{
    display: grid;
    grid-template-columns: 3rem 1fr 3rem;
    grid-template-rows: 3rem;
    grid-column-gap: 1.5rem;
    grid-template-areas: "pic comment btn";
    align-items: center;

    background: rgb(255, 255, 255);
    margin: 1rem;

    .userAvatar{
        grid-area: pic;
    }
    .messageCom{
        grid-area: comment;
    }
    .submitCom{
        grid-area: btn;
        margin: 0;
        padding: 0;
        font-size: 2rem;
        width: min-content;
        color: darken($ligth_theme_Color_primary,10%);
    }
}

</style>