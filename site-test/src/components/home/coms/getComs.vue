post/:post
<template>

        <div v-on:click="getCom" class="com">{{data}}</div>
        
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
     mounted(){},
     methods:{
         getCom(){
            // const userId = localStorage.getItem("userId");
            // const postId = this.postId;
            const token =localStorage.getItem("token"); 
            console.log('get com');
            console.log(this.postId);

 
            fetch('http://localhost:3000/api/com/post/'+this.postId, {
                method : "Get",
                headers: { 
                    "Content-Type": "application/json",
                    "authorization" : 'Bearer ' + token, 
                },
            }) 
            .then(function(res){
                return res.json();
            })    
            .then(value => (this.data = value, console.log(this.data) ))
            .catch(function(){
                console.log('erreur de requete');
            })

            //  this.axios.get('http://localhost:3000/api/com/post/'+this.postId, {
            //     headers: { 
            //         // "Content-Type": "application/json",
            //         "authorization" : 'Bearer ' + token, 
            //     },
            // }) 
            // .then(response => {
            //     this.data = response.data
            //     console.log(response)
            //     console.log(response.data);
            // })
            // .catch(function(){
            //     console.log('erreur de requete');
            // })

         },
     }
}
</script>

<style scoped lang="scss">
.com{
width: 100%;
min-height:10rem; 
background: orange; 
}
</style>