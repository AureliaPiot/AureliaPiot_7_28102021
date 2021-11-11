<template>
    <div class="editCom">
            <form >
                <div class="bodyPost">
                    <input  type="text" class="" :name="'editCom'+this.id" :value="this.content">
                </div>
                <div class="footerPost d-flex justify-content-between">
                    <button class="btn btn-primary w30" @click.prevent="submitComEdit">entrée</button>
                </div>    
            </form>
        <button class="close" @click.prevent="$emit('closeEditCom')" >X</button>
    </div>
</template>

<script>

export default {

    name:'editPost',
    props: {
        content:String,
        id: Number
    },
    data(){
        return{

        }
    },

    methods:{
        close(){
            this.$emit('close')
        },

        submitComEdit(){
            // const dataform = new FormData();
            // dataform.append('content',document.getElementsByName("messageEdit")[0].value);

            // fetch('http://localhost:3000/api/com/'+this.id, {
            //     method : "Put",
            //     headers: { 
            //         // "Content-Type": "application/json", 
            //         "authorization" : 'Bearer ' + localStorage.getItem('token'),
            //         },
            //     body: dataform,
            // }) 
            // .then(function(res){return res.json();}) 
            // .then(value => (console.log(value) ))
            // .catch(function(){ console.log('erreur de requete'); })
        },
    },//methods




}
</script>

<style scoped lang="scss">
// gere le post en grid
// .editCom{
//     position: absolute;
//     z-index: 5;
//     top: 65px;
//     left: 0;
//     width: 100%;
//     background: white;
//     margin: 2rem 0;
//     padding: 2rem;
//     border-radius: 8px;
//     img{
//         width: 50%;
//     }

//     .headerPost{
//         p{
//             margin-right: 1rem;
//         }
//         .profilePic{
//             width: 3rem;
//             // height: 1rem;
//         }
//     }
//     .bodyPost{
        
//         min-height: 4rem;
//         padding: 1rem;
//         .imgPost{
//             max-width: 80%;
//             max-height: 30vw;
//         }

//     }
//     .footerPost{
//         text-align: center;
//         min-height: 4rem;
//         background: rgb(237, 240, 243);
//         border-top: 1px solid rgb(223, 223, 223);
//         border-bottom: 1px solid rgb(223, 223, 223);




//     }
// }
    .close{
        position: absolute;
        top: 10px;
        right: 10px;

        background: rgb(158, 11, 11);
        color: rgb(255, 255, 255);
        font-weight: 900;
    }

</style>