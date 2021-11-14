<template>
<div class="editPost">
    <div class="headerPost ">
       <div class="userData">
            <div class="user"></div>        
       </div> <!-- userdata -->
    </div>
        <form enctype="multipart/form-data">
            <div class="bodyPost">
                <textarea class="form-control" id="message" rows="3" name="messageEdit" :value="content"></textarea>

                <img  v-if="this.file" :src="this.file" alt="upload-img" >
                
                <!-- <p>{{ content }}</p>
                <p>{{ attachement }}</p> -->
            </div>
            <div class="footerPost d-flex justify-content-between">
                <input type="file"  class="btn btn-outline-primary" id="file" name="fileEdit"  @change="onFileChange">
                <!-- <div>entrée</div> -->
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
        // post: Object,
        id: Number,
        User:Object,
        content:String,
        attachement:String,

        query: String

    },
    data(){
        return{
            oldFile: this.attachement,
            file : this.attachement
        }
    },

    methods:{
        close(){
            this.$emit('close')
        },

         onFileChange(e) {
            const file = e.target.files[0];
            this.file = URL.createObjectURL(file);
            console.log('file')
            console.log(file)
            },

        submitEdit(){
            const dataform = new FormData();
            dataform.append('content',document.getElementsByName("messageEdit")[0].value);
            dataform.append('oldFile',this.oldFile);
            dataform.append('file',document.getElementsByName("fileEdit")[0].files[0]);

            const data ={
                id:this.id,
                content:document.getElementsByName("messageEdit")[0].value,
                oldFile:this.oldFile,
                file:document.getElementsByName("fileEdit")[0].files[0]
            }
            this.$store.dispatch('postStore/savePost',
                data.id,
                data.content,
                data.oldFile,
                data.file
                )
            // fetch('http://localhost:3000/api/post/'+this.id, {
            //     method : "Put",
            //     headers: { 
            //         // "Content-Type": "application/json", 
            //         "authorization" : 'Bearer ' + localStorage.getItem('token'),
            //         },
            //     body: dataform,
            // }) 
            // .then(function(res){return res.json();}) 
            // .then(value => (console.log(value) ))
            // .catch(function(){
            //     console.log('erreur de requete');
            // })

        },
    },//methods




}
</script>

<style scoped lang="scss">
// gere le post en grid
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
    img{
        width: 50%;
    }

    .headerPost{
        p{
            margin-right: 1rem;
        }
        .profilePic{
            width: 3rem;
            // height: 1rem;
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