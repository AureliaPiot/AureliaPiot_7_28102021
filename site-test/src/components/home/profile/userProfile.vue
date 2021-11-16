<template>
    <div>
        <div class="profil-card">

            <div class="card-head">
                <p class="deleteUser text-center m-0 text-danger" v-if="this.isUser == this.userId" @click="deleteCompte">delete</p>
                <h2> {{userName}} {{userPrenom}} <i class="fas fa-crown"  v-if="this.userRole == 'admin'" ></i></h2>
            </div>
            <div class="card-left">
                    <img  class="pic" :src="this.profilePic" :alt="this.userName">
            </div>
            <div class="card-right">
                <p>Description :</p>
                <div v-if="!editbio" class="userBio">
                    {{userBio}}
                </div>

                <input v-if="editbio" type="textarea" class="userBio eBio" rows="3" name="newBio" :value="this.userBio" v-on:change="this.getNewBio">
            </div>
            <!-- <div v-if="this.isUser == this.userId" class="d-flex editpart"> -->
                <div  v-if="this.isUser == this.userId" class="col editPp">
                    <button @click="showEditPP">edit profile pic</button>

                    <div  v-if="editPic" class="newpp">
                        <form id="newPP">
                            <input id="file" type="file" name="profilePic"  accept=".jpg, .jpeg, .png" v-on:change="this.getNewPic">
                        </form>
                    </div>
                </div>

                <div v-if="this.isUser == this.userId" class="col editBio">
                    <button @click="showEditBio">edit bio</button>
                </div>

                <div v-if="this.isAdmin" class="editRole">
                    <p>Role</p>
                   <div class="form-check">
                        <input class="form-check-input" type="radio" name="role" id="roleMute" value="mute" :checked="this.userRole == 'mute'" @change="getRole" v-model="this.newRole">
                        <label class="form-check-label" for="roleMute">
                            Mute
                        </label>
                   </div>
                   
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="role" id="roleUser" value="user" :checked="this.userRole == 'user'" @change="getRole" v-model="this.newRole">
                        <label class="form-check-label" for="roleUser">
                            User
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="role" id="roleAdmin" value="admin"  :checked="this.userRole == 'admin'" @change="getRole" v-model="this.newRole">
                        <label class="form-check-label" for="roleAdmin">
                            Admin
                        </label>
                    </div>
                </div>
            <!-- </div> -->

        </div>



        <!-- <getPost :query="'/user/'+this.id" /> -->
    </div>



</template>

<script>
// import getPost from '@/components/home/post/get_post.vue'

export default {
  name: 'user-profile',
    components:{
        // getPost
    },
   data(){  
       return{
            isUser :localStorage.getItem('userId'),
            isAdmin :localStorage.getItem('role') == 'admin',
            token :localStorage.getItem('token'),


            id :  this.$route.params.id,
            userData :null,
            profilePic: null,

            userId:null,
            userName:null,
            userPrenom:null,
            userBio:null,
            userEmail:null,
            userRole:null,

            editPp:null,
            editbio:null,
 
            editBio : false,
            editPic :false,

            newRole: null,
        }
  },
  props: {
    user: String
  },
created(){
},
   methods:{
 
        getUserData(){


            fetch('http://localhost:3000/api/user/'+this.id, {
                method : "Get",
                headers: { 
                    "Content-Type": "application/json",
                    "authorization" : 'Bearer ' + this.token, 
                },
            }) 
            .then(function(res){
                return res.json();
            })    
            .then(value => (
                this.userData = value,
                this.userId=value.id,
                this.userName = value.nom,
                this.userPrenom = value.prenom,
                this.userEmail = value.email,
                this.userRole = value.role,
                this.userBio = value.bio,



                this. profilePic=value.profilePic 
                // ,console.log(this.userData)
                ))

            .catch(function(){
                console.log('erreur de requete');
            })
        },//getUsersdata

        // editUserName(){
        //     console.log('editname')
        //     if(!this.editName){
        //         this.editName = true
        //     }
        //     else if(this.editName){
        //         this.editName = false
        //     }


        // },// editUserName

        showEditBio(){
             console.log('editbio')
            if(!this.editbio){
                this.editbio = true
            }
            else if(this.editbio){
                this.editbio = false
            }
        },
        showEditPP(){
             console.log('editpic')
            if(!this.editPic){
                this.editPic = true
            }
            else if(this.editPic){
                this.editPic = false
            }
        },
        getNewPic(e) {
            const oldFile = this.profilePic;
            console.log('oldFile')
            console.log(oldFile)


            console.log('file')

            const file = e.target.files[0];
            this.profilePic = URL.createObjectURL(file);

            console.log(file)

            const data = new FormData();
            data.append('oldFile',oldFile);
            data.append('file',file);

            this.axios.put('http://localhost:3000/api/user/file/'+this.id ,data, {
            headers: {
                    "authorization" : 'Bearer ' + this.token,
                    },
            }) 
            .then(function(res){return res.json();})    
            .then(value => (console.log(value) ))
            .catch(function(){console.log('erreur de requete');})
            

            
        },
        getNewBio() {
            const oldBio = this.userBio;
            const bio = document.getElementsByName('newBio')[0].value;
            this.userBio = bio;
            
            console.log('bio')
            console.log(this.userBio)
            console.log(oldBio)


            if(oldBio !== bio){
                this.$store.dispatch('userStore/UpdateUserBio',{id: this.id, form : {bio : bio}});
                this.editbio = false
            }
        },
        getRole(){
            console.log('change role');
            console.log(this.newRole)
            const role = this.newRole;
            this.$store.dispatch('userStore/UpdateUserRole',{id: this.id, form : {role : role}});
        },

        deleteCompte(){
            console.log('delete compte');
           if(confirm('you sure ?')){
            console.log('okay');

            fetch('http://localhost:3000/api/user/'+this.id, {
                method : "Delete",
                headers: { 
                    "Content-Type": "application/json",
                    "authorization" : 'Bearer ' + this.token, 
                }
            })
            .then(function(res){return res.json()})    
            .then(value => (console.log(value)),
            this.$store.dispatch('userStore/logOut'))
            .catch(function(){console.log('erreur de requete')})

           }//if

        }//delete compte


        



    },//methods
    beforeMount(){
        this.getUserData();
    },
  
}

</script>



<style scoped lang="scss">
.profil-card{
    background: rgb(255, 255, 255);
    border-radius: 8px;
    padding: 3rem;

    display: grid;
    grid-gap: 1rem 4rem;
    grid-template-columns: 33% 1fr;
    grid-template-areas:"name name" 
                        "editPp editBio"
                        "left right"
                        "editRole editRole"
                        ;

    .card-head{
        grid-area: name;

    }
    .card-left{
        grid-area: left;
        .pic{
            width: 100%;
            height: 100%;
            max-height: 11vw;
            border-radius: 15%;
            object-fit: cover;

        }

    }
    .card-right{
        grid-area: right;
        p{
            font-weight: 800;
            margin: 0;
        }
        .userBio{
            min-height: 10vw;
            width: 100%;
            padding: 1rem;
            border-radius: 20px;
            background-color: rgba(35, 132, 189, 0.014);
            border: 1px solid rgba(26, 44, 126, 0.322);
        }
        .eBio{
            border: 2px solid rgba(58, 83, 192, 0.322);

        }
        
    }

}
h2{
    color: rgb(17, 52, 66);
}
.editPp{
        grid-area: editPp;

}
.editBio{
        grid-area: editBio;

}
.editRole{
        grid-area: editRole;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        padding: 1rem;
        border: 1px solid #b3b9d5;
        border-radius: 10px;

    p{
        font-weight: 800;
        font-size: 2rem;
        margin: 0;
    }
}
@media (max-width: 1200px) {
    .profil-card{
        .card-left{
            .pic{
                width: 60%;
            }
        }

    }
}

@media (max-width: 767px) {
.profil-card{
    background: rgb(255, 255, 255);
    border-radius: 8px;
    padding: 3rem;

    display: grid;
    grid-gap: 1rem 4rem;
    grid-template-columns: 20% 1fr;
    grid-template-areas:"name name" 
                        "editPp left"
                        "editBio  right"
                        "editRole editRole"
                        ;
        .card-left{
            place-self: center;
            .pic{
                width: 100%;
            }
        }

}
}

</style>
