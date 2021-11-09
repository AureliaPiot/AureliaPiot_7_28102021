post/:post
<template>

        <div class="com">{{data}}</div>
        
</template>

<script>
export default {
    name:'get_com',
    props: {
        // userPP :String,
        postId : Number

    },
    data(){
        return{
            data:""
        }
    },
     mounted(){
        //  getCom(){
            // const userId = localStorage.getItem("userId");
            const token =localStorage.getItem("token"); 
 
            // fetch('http://localhost:3000/api/com/post/'+this.postId, {
            //     method : "GET",
            //     headers: {
            //         // "Content-Type": "application/json" ,
            //         "authorization" : 'Bearer ' + token,
            //         },
            // }) 
            // .then(function(res){return res.json();}) 
            // .then(value => (console.log(value), this.data =value ))
            // .catch(function(){
            //     console.log('erreur de requete');
            // })

             this.axios.get('http://localhost:3000/api/post/'+this.postId, {
                headers: { 
                    "Content-Type": "application/json",
                    "authorization" : 'Bearer ' + token, 
                },
            }) 
            .then(response => {
                this.data = response.data
                console.log(response)
                console.log(response.data);
            })
            .catch(function(){
                console.log('erreur de requete');
            })

         },
    //  }
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