<template>

    <div class="newPost">
        <h2>quoi de neuf ?</h2>
        <form id="newPost" class="form-inline" enctype="multipart/form-data">


            <div class="form-group">
                <label class="none" for="message">message</label>
                <textarea class="form-control" id="message" rows="3"  name="message" placeholder="exprimez-vous!" required></textarea>
                <img v-if="url" class="preview" :src="url" alt="img" />
            </div>
            <div class="row justify-content-between m0">
                <label for="file" class="file-upload btn btn-outline-primary w30">file</label>
                <input type="file"  class="btn btn-outline-primary w30" id="file" name="file" accept=".jpg, .jpeg, .png, .gif" @change="onFileChange">

                <button v-if="url" class="btn --invalide --text-delete w30" @click.prevent="clearImg">clear</button>

                <button class="btn btn-outline-primary w30" v-on:click.prevent="submitPost">Submit</button>
            </div>

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
        clearImg(){
            console.log(document.getElementsByName("file")[0].value)
            this.url=null;
            document.getElementsByName("file")[0].value="";      
        },
         submitPost(){

            const userId = localStorage.getItem("userId");
            let message = document.getElementsByName("message")[0];
            let file = document.getElementsByName("file")[0].files[0];
            this.url = null;

            if(file === undefined ){
                 file = "null"
            }

            const inputEmpty = /[\S]+/;

            if(inputEmpty.test(message.value) == false && file == "null"){
                message.classList.add('--invalide');
                message.value="";

                setTimeout(function(){
                    message.classList.remove('--invalide');
                }, 500);


                return console.log('input empty');
            }

            const dataform = new FormData();
            dataform.append('userId',userId);
            dataform.append('message',message.value);
            dataform.append('file',file);
            dataform.append('createDate',new Date().toISOString().slice(0, 19).replace('T', ' '))

            let form = dataform;        

        //  ---
        this.$store.dispatch('postStore/newPost', form);

        document.getElementById("newPost").reset();

         },
     }
}
</script>

<style scoped lang="scss">

.newPost{
    background: rgb(255, 255, 255);
    width: 100%;
    padding: 1rem;
    border-radius: 8px;
    margin: 2rem 0;
    border:1px solid $ligth_theme_Color_primary ;
    text-align: center;
}

.w30{
    width: 30%;
    background: rgba(0, 0, 255, 0.034);
}

.preview{
    max-height:10vw;
    width: auto;
    margin: 0.5rem;
}

input[type="file"] {
    display: none;
}
.file-upload {
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
.m0{
    margin: 5px 0;
}
@media (max-width: 1200px) {
    .preview{
     max-height:15vw;

    }
}

@media (max-width: 767px) {
    .preview{
     max-height:30vw;

    }
}
</style>