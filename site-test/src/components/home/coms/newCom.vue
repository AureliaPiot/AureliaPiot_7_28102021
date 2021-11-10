<template>

        <form id="newCom" class="form-inline newCom" enctype="multipart/form-data">


            <div class="form-group row justify-content-around">
                <!-- <label for="message">message</label> -->
                <img  v-bind:src="this.profilePic" alt="" class="userAvatar">
                <input  type="text" class="form-control messageCom" :name="'messageCom'+postId" id="messageCom" placeholder="commentaire...">
            
                <!-- <button class="btn btn-outline-primary w30" v-on:click.prevent="submitPost"><i class="fas fa-arrow-alt-circle-right"></i></button> -->
                <!-- <div class="btn submitCom" v-on:click.prevent="submitPost"><i class="fas fa-arrow-alt-circle-right"></i></div> -->
                <i class="fas fa-arrow-alt-circle-right submitCom"  v-on:click.prevent="submitCom"></i>


            </div>
            

        </form>
        
</template>

<script>
export default {
    name:'new_com',
    props: {
        // userPP :String,
        userId : Number,
        postId : Number
    },
    data(){
        return{
            profilePic : localStorage.getItem('PP')
        }
    },
     methods:{
         submitCom(){
            const userId = localStorage.getItem("userId");
            const token =localStorage.getItem("token"); 
            const data= {
                UserId: userId,
                PostId: this.postId ,
                content : document.getElementsByName("messageCom"+this.postId)[0].value,                
                createDate :Date.now(),
             }
            console.log(data)
            const dataform = new FormData();
            dataform.append('PostId',data.PostId);
            dataform.append('UserId',data.userId);
            dataform.append('content',data.content);
            dataform.append('createDate',data.createDate);

        
            fetch('http://localhost:3000/api/com/', {
                method : "POST",
                headers: {
                    "Content-Type": "application/json" ,
                    "authorization" : 'Bearer ' + token,
                    },
                body: JSON.stringify(data),


            }) 
            .then(function(res){return res.json();}) 
            .then(value => (console.log(value) ))
            .catch(function(){
                console.log('erreur de requete');
            })
         },
     }
}
</script>

<style scoped lang="scss">
#newCom{
    background: rgb(255, 255, 255);
    width: 100%;
    // height: 10vw;
    margin: 1rem;
    border-radius: 8px;
    // margin-bottom: 2rem;
    .userAvatar{
        width: 4rem;
        // height: 1rem;
        border-radius: 50%;
        background: yellow;
    }
    .submitCom{
        width: 10%;
        font-size: 2rem;
    }
}
.messageCom{
    width: 50%;
}
.w30{
    width: 30%;
    background: rgba(0, 0, 255, 0.034);
}
</style>