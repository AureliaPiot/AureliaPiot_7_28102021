<template>
<div class="editPost">

        <form enctype="multipart/form-data">
            <div class="bodyPost">
                <textarea class="form-control" id="message" rows="3" name="messageEdit" :value="content"></textarea>

                <img  v-if="this.file !=='null' " :src="this.file" alt="upload-img" >

            </div>
            <div class="footerPost d-flex justify-content-between">
                <input type="file"  class="btn btn-outline-primary" id="file" name="fileEdit"  @change="onFileChange">
                <button class="btn btn-danger w30" @click.prevent="clearImg">clear Img</button>
                <button class="btn btn-primary w30" @click.prevent="submitEdit">entrée</button>
            </div>    
        </form>
    <button class="close" @click.prevent="$emit('close')" >X</button>
</div>

   
</template>

<script>

export default {
    name:'editPost',
    props: {

        id: Number,
        User:Object,
        content:String,
        attachement:String,

        query: String

    },
    data(){
        return{
            oldFile: this.attachement,
            file : this.attachement,
            clearFile : false
        }
    },

    methods:{
        close(){
            this.$emit('close')
        },

         onFileChange(e) {
            const file = e.target.files[0];
            this.file = URL.createObjectURL(file);
            this.clearFile = false;
            console.log('file')
            console.log(file)
        },
        clearImg(){
            this.file = 'null';
            this.clearFile = true;
             document.getElementsByName("fileEdit")[0].value = "";

        },
        submitEdit(){
            const inputEmpty = /[\S]+/;
            const content = document.getElementsByName("messageEdit")[0]


            if(inputEmpty.test(content.value)== false && this.file == "null"){
                 this.$store.dispatch('postStore/deletePost',{id:this.id,query:this.query});
                return console.log('[post vide, suppression du post]')
            }

            const file = document.getElementsByName("fileEdit")[0].files[0];
            
            const dataform = new FormData();
            dataform.append('content',content.value);
            dataform.append('oldFile',this.oldFile);
            dataform.append('file',file);
            dataform.append('clearFile',this.clearFile);

            const form = dataform;
            console.log(file ? "nouveau fichier" : "pas de nouveau fichier")
            console.log(this.clearFile ? "suppression de l'ancienne image" : "pas de suppression de fichier")

            this.$store.dispatch('postStore/updatePost',{id:this.id,form:form,query:this.query});

        },
    },//methods




}
</script>

<style scoped lang="scss">

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
    .iconEdit{
        margin: 0 2rem;
    }
    img{
        width: 50%;
    }

    .headerPost{
        p{
            margin-right: 1rem;
        }
        .profilePic{
            width: 3rem;
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