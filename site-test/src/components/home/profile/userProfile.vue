<template>
    <div>
        <div class="profil-card" v-if="userData != null">
            <!-- [CARD HEAD] -->
            <div class="card-head">
                <p class="deleteUser text-center m-0 --text-delete " v-if="this.isUser == userData.id" @click="deleteCompte">delete</p>
                
                <div class="userNames">
                    <h2 v-if="!this.editName"> 
                        {{userData.nom}} 
                        {{userData.prenom}} 
                        <i class="fas fa-crown"  v-if="userData.role == 'admin'" ></i>
                        <i class="fas fa-comment-slash" v-if="userData.role == 'mute'"></i>
                    </h2>

                    <div class="edit-Name" v-if="this.editName">
                        <input type="text" name="nom" :value="userData.nom" v-on:change="this.getNewName" maxlength="20">
                        <input type="text" name="prenom" :value="userData.prenom" v-on:change="this.getNewName" maxlength="20">
                    </div>
                    
                    <button  class="btn --edit text-white fw-bold"  v-if="this.isUser == userData.id" @click="showEditName">
                        <i  v-if="!this.editName" class="fas fa-pen"></i>
                        <i v-if="this.editName" class="fas fa-check"></i>
                    </button>
                    
                </div>

            </div>

            <!-- [CARD LEFT] -->
            <div class="card-left">
                    <img  class="pic" :src="userData.profilePic" :alt="userData.nom">
            </div>

            <!-- [V-IF EDIT PP] -->
                <div  v-if="this.isUser == userData.id" class="col editPp">
                    <button class="btn --edit text-white fw-bold" @click="showEditPP"><i class="fas fa-image"></i></button>

                    <div  v-if="editPic" class="newpp">
                        <form id="newPP">
                            <label for="file" class="btn --edit text-white">choisir</label>
                            <input id="file" type="file" name="profilePic"  accept=".jpg, .jpeg, .png" v-on:change="this.getNewPic" >
                            <button class="btn btn-danger" @click.prevent="this.deletePic">supp</button>
                        </form>
                    </div>
                </div>
                

            <!-- [V-IF EDIT BIO] -->
                <div v-if="this.isUser == userData.id" class="col editBio">
                    <button class="btn --edit text-white fw-bold" @click="showEditBio">
                        <i v-if="!editbio" class="fas fa-pen"></i>
                        <i v-if="editbio" class="fas fa-check"></i>
                    </button>
                   
                </div>

            <!-- [CARD RIGHT] -->
            <div class="card-right">
                <p>Description :</p>
                <div v-if="!editbio" class="userBio">
                    {{userData.bio}}
                </div>
                <textarea v-if="editbio"  class="userBio eBio" rows="6"  name="newBio" :value="userData.bio" v-on:change="this.getNewBio"></textarea>
            </div>

            <!-- [V-IF EDIT ROLE] -->
                <div v-if="this.isAdmin" class="editRole">
                    <p>Role</p>
                   <div class="form-check">
                        <input class="form-check-input" type="radio" name="role" id="roleMute" value="mute" :checked="userData.role == 'mute'" @change="getRole" v-model="this.newRole">
                        <label class="form-check-label" for="roleMute">
                            Mute
                        </label>
                   </div>
                   
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="role" id="roleUser" value="user" :checked="userData.role == 'user'" @change="getRole" v-model="this.newRole">
                        <label class="form-check-label" for="roleUser">
                            User
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="role" id="roleAdmin" value="admin"  :checked="userData.role == 'admin'" @change="getRole" v-model="this.newRole">
                        <label class="form-check-label" for="roleAdmin">
                            Admin
                        </label>
                    </div>
                </div>

        </div>




    </div>



</template>

<script>


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
            
            editPp:null,
            editbio:null,

            editName:false,
            editBio : false,
            editPic :false,

            newRole: null,
        }
  },
  props: {
    user: String
  },
  watch: {
      '$route' () {
          if(this.$route.name !== "HomePage"){
              this.id = this.$route.params.id;
          }
      }
  },
  computed:{
    loading(){
        return this.$store.state.userStore.loading
    },
    userData(){
        return this.$store.state.userStore.userProfile
    }
  },
   methods:{
        showEditName(){
            if(!this.editName){
                this.editName = true
            }
            else if(this.editName){
                this.editName = false
            }
        },
        showEditBio(){
            if(!this.editbio){
                this.editbio = true
            }
            else if(this.editbio){
                this.editbio = false
            }
        },
        showEditPP(){
            if(!this.editPic){
                this.editPic = true
            }
            else if(this.editPic){
                this.editPic = false
            }
        },
        getNewPic(e) {
            const oldFile = this.userData.profilePic;
            console.log('oldFile')
            console.log(oldFile)


            const file = e.target.files[0];
            this.profilePic = URL.createObjectURL(file);

            console.log(file)

            const data = new FormData();
            data.append('oldFile',oldFile);
            data.append('file',file);

            const form = data;
            this.$store.dispatch('userStore/UpdateUserProfilePic',{id: this.id, form : form});

            
        },
        deletePic() {
            const oldFile = this.userData.profilePic;
            const file = 'clear';

            const data = new FormData();
            data.append('oldFile',oldFile);
            data.append('file',file);

            this.$store.dispatch('userStore/UpdateUserDeletePic',{id: this.id, form : {oldFile: oldFile, newFile: "clear"}});
         
        },

        getNewName() {
            console.log('new name')
            const nom = document.getElementsByName('nom')[0].value.replace(/[^a-zA-Z]/g, "");
            const prenom = document.getElementsByName('prenom')[0].value.replace(/[^a-zA-Z]/g, "");
            console.log(nom.length)
            console.log(prenom)

            if(nom.length > 0 && prenom.length > 0){

                    this.$store.dispatch('userStore/UpdateUserName',{id: this.id, form : {nom : nom , prenom : prenom}});
                    this.editName = false
            }
            else{
                if(nom.length > 0 ){
                    alert('champs nom invalide')
                }
                if( prenom.length > 0){
                    alert('champs prenom invalide')
                }
            }

        },

        getNewBio() {
            let bio = document.getElementsByName('newBio')[0].value;
            const inputEmpty = /[\S]+/;
            if(inputEmpty.test(bio)== false){
                bio =""
            }
            this.$store.dispatch('userStore/UpdateUserBio',{id: this.id, form : {bio : bio}});
        },
        
        getRole(){
            console.log('change role');
            console.log(this.newRole)
            const role = this.newRole;
            this.$store.dispatch('userStore/UpdateUserRole',{id: this.id, form : {role : role}});
        },

        deleteCompte(){
            console.log('delete compte');
           if(confirm('ATTENTION: cette action entrainera la suppression de toutes les données et actions en relation avec votre compte,(vos posts, commentaire et like seront supprimés) êtes vous certain de vouloir supprimer votre compte ?')){
            console.log('okay');
            this.$store.dispatch('userStore/deleteUser',{id: this.id});
           }//if

        }//delete compte


        



    },//methods
 
  
}

</script>



<style scoped lang="scss">

#file{display:none;}



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

        display: grid;
        grid-gap: 1rem 1rem;
        grid-template-rows: 0fr 0fr;

        .deleteUser{
            display: inline-flex;
            justify-self: center;
            cursor: pointer;
        }

        .userNames{
            display: flex;
            justify-content: center;
        }

    }
    .card-left{
        grid-area: left;
        .pic{
            max-height: 11vw;
            border-radius: 15%;
            margin-top: 1rem;
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
            border: 2px solid rgba(22, 61, 236, 0.466);

        }
        
    }

}
h2{
    color: rgb(17, 52, 66);
}
.editPp{
        grid-area: editPp;
        text-align: end;

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
            text-align: center;
            .pic{
                width: 60%;

                // width: auto;
            }
        }

    }
}

@media (max-width: 767px) {
    .profil-card{
        background: rgb(255, 255, 255);
        border-radius: 8px;
        padding: 1rem;

        display: grid;
        grid-gap: 1rem 0.5rem;
        grid-template-columns: 0fr 1fr;
        grid-template-areas:"name name" 
                            "editPp left"
                            "editBio  right"
                            "editRole editRole"
                            ;
            .card-left{
                place-self: center;
                .pic{
                    margin-top: 0;

                    width: 20vw;
                    height: 20vw;
                    min-height: 5rem;
                    min-width: 5rem;
                    max-height: none;

                }
            }
            .editPp, .editBio{
                justify-self: self-end;
            }

    }
}


</style>
