<template>

        <form class="col-md-10 mx-auto"> 

                <div class="form-group my-md-4">
                    <label for="nom_input">Nom</label>
                    <input type="text" class="form-control" id="nom_input"  placeholder="nom" name="nom_Sign" required>
                </div>
                <div class="form-group my-md-4">
                    <label for="prenom_input">Prenom</label>
                    <input type="text" class="form-control" id="prenom_input"  placeholder="prenom" name="prenom_Sign" required>
                </div>
                <div class="form-group my-md-4">
                    <label for="email_input">Email</label>
                    <input type="email" class="form-control" id="email_input"  placeholder="Enter email" name="email_Sign" required>
                </div>
                <div class="form-group my-md-4">
                    <label for="password_input">Password</label>
                    <input type="password" class="form-control" id="password_input" placeholder="Password" aria-describedby="passwordHelp" minlength="8" autocomplete="off" name="password_Sign" required>
                    <small id="passwordHelp" class="form-text text-muted"> never share your password with anyone else.</small>
                </div>
                <div class="d-flex justify-content-center">
                     <button id="signSubmit" type="button" class="submit btn btn-primary" v-on:click="signIn">Entrée</button>
                </div>

         </form>


</template>

<script>
export default {
  name: 'SignIn',
  methods:{
      signIn(){
        // on appel dans le store l'action que l'on souhaite effectuer
           this.$store.dispatch('userStore/Sign',{
             // ici les element communiquer au store (dans un objet)
                nom : document.getElementsByName("nom_Sign")[0].value,
                prenom : document.getElementsByName("prenom_Sign")[0].value,
                email : document.getElementsByName("email_Sign")[0].value,
                password : document.getElementsByName("password_Sign")[0].value,
            })
        },
        // redirectHome(){
        //     this.router.push({name: 'Home'});
        //     console.log('lezgo')
        // }

  }
}
</script>


<style lang="scss">
// body{
//     background:  url("../../../src/assets/logo/icon.svg")
//                  no-repeat
// //   background-color:#f3f6f8;

// }
</style>
