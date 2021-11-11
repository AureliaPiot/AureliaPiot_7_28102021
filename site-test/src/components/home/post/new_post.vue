<template>

    <div class="container">
        <h2>new post</h2>
        <form id="newPost" class="form-inline" enctype="multipart/form-data">


            <div class="form-group">
                <textarea class="form-control" id="message" rows="3" name="message" placeholder="exprimez-vous!" required></textarea>
                <img v-if="url" class="preview" :src="url" />
            </div>
            <div class="row justify-content-between">
                <input type="file"  class="btn btn-outline-primary w30" id="file" name="file" accept=".jpg, .jpeg, .png, .gif" @change="onFileChange">
                <button class="btn btn-outline-primary w30" v-on:click.prevent="submitPost">Submit</button>
            </div>
<!-- au click refresh le composant get post et vider les inputs -->
        </form>
        
    </div>

</template>

<script>
export default {
    name:'new_post',
    props: {
        msg: String
    },
    data(){
        return{
            url: null
        }
    },
     methods:{
         onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
            },
         submitPost(){
            const userId = localStorage.getItem("userId");
            const token =localStorage.getItem("token"); 
            let file = document.getElementsByName("file")[0].files[0];



            if(file === undefined ){
                 file = "null"
            }
            const data= {
                userId: userId,
                message : document.getElementsByName("message")[0].value,
                file: file,
                // like:JSON.stringify({userLike:[]}),                
                // createDate:Date.now(),
             }
                // console.log(data.like);
                // console.log(JSON.parse(data.like));
            const dataform = new FormData();
            dataform.append('userId',userId);
            dataform.append('message',data.message);
            dataform.append('file',file);
            // dataform.append('like',data.like);

         
            this.axios.post('http://localhost:3000/api/post',dataform, {
                headers: {
                     "authorization" : 'Bearer ' + token,
                     },
            }) 
            .then(function(response) {
                console.log(response.data);
                document.getElementById("newPost").reset();
            })
            .catch(function (error) {
                console.log(error);
            });
         },
     }
}
</script>

<style scoped lang="scss">
.preview{
    // width: 50%;
    max-height:10vw;
}
.container{
    background: rgb(255, 255, 255);
    width: 100%;
    // height: 10vw;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 2rem;
}
.w30{
    width: 30%;
    background: rgba(0, 0, 255, 0.034);
}
</style>