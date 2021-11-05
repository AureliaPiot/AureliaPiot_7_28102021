<template>

    <div class="container">
        <h2>new post</h2>
        <form class="form-inline">


            <div class="form-group">
                <label for="message">message</label>
                <textarea class="form-control" id="message" rows="3" name="message" required></textarea>
            </div>
            <div class="form-group">
                <input type="file" class="form-control-file" id="file" name="file">
                <!-- afficher le fichier si un est entré! -->
            </div>

            <button v-on:click.prevent="submitPost">Submit</button>

        </form>
        
    </div>

</template>

<script>
export default {
    name:'new_post',
    props: {
        msg: String
    },
     methods:{
         submitPost(){
            const userId = localStorage.getItem("userId");
            const token =localStorage.getItem("token"); 
            let file = document.getElementsByName("file")[0].value;

             if(file.length === 0 ){
                 file = "null"
             }
            const data= {
                userId: userId,
                message : document.getElementsByName("message")[0].value,
                file: file,
                like:[0],
                // createDate:Date.now(),
             }
             console.log(data);
             console.log("userId "+ userId);
             console.log("file "+ file);



             fetch('http://localhost:3000/api/post', {
                method : "Post",
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
             



         }
     }
}
</script>

<style scoped lang="scss">
.container{
    background: rgb(255, 255, 255);
    width: 100%;
    // height: 10vw;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 2rem;
}
</style>