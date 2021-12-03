<template>

        <form class="col-md-10 mx-auto"> 

                <div class="form-group my-md-4">
                    <label for="nom_input">Nom</label>
                    <input type="text" class="form-control" id="nom_input"  placeholder="nom" name="nom_Sign" maxlength="20" required>
                </div>
                <div class="form-group my-md-4">
                    <label for="prenom_input">Prenom</label>
                    <input type="text" class="form-control" id="prenom_input"  placeholder="prenom" name="prenom_Sign" maxlength="20" required>
                </div>
                <div class="form-group my-md-4">
                    <label for="email_input">Email</label>
                    <input type="email" class="form-control" id="email_input"  placeholder="Enter email" name="email_Sign" required>
                </div>
                <div class="form-group my-md-4">
                    <label for="password_input">Password</label>
                    <input type="password" class="form-control" id="password_input" placeholder="Password" aria-describedby="passwordHelp" minlength="8" autocomplete="off" name="password_Sign" required>
                    <small id="passwordHelp" class="form-text text-muted"> Huit caractères, une lettre minuscule et majuscule, un chiffre et un caractère spécial.</small>
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
          const nom =  document.getElementsByName("nom_Sign")[0].value.replace(/[^a-zA-Z]/g, "")
          const prenom = document.getElementsByName("prenom_Sign")[0].value.replace(/[^a-zA-Z]/g, "")
          const email = document.getElementsByName("email_Sign")[0].value
          const password = document.getElementsByName("password_Sign")[0].value

          if(nom.length !== 0 &&
           prenom.length !== 0 &&
           email.length !== 0 &&
           password.length !== 0 
           ){

            if(this.emailRegex(email)){

                if(this.passwordRegex(password)){

                        this.$store.dispatch('userStore/Sign',{
                            nom :nom,
                            prenom : prenom,
                            email : email,
                            password : password,
                        })
                    }else if(!this.passwordRegex(password)){
                        alert('le mot de passe doit contenir au moins Huit caractères, une lettre minuscule et majuscule, un chiffre et un caractère spécial ;)')
                    }

                }
                else if(!this.emailRegex(email)){
                        alert('email non valide')
                }
            }
            else {
             alert('merci de remplir correctement tous les champs! (le nom et prenom doivent etre composé seulement de lettre')
            }


        },

        emailRegex(value){
            const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ 
            return regex.test(value)

        },
        passwordRegex(value){
            const regex =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            console.log(regex.test(value))
            return regex.test(value)
        }

  }
}
</script>


<style lang="scss">
</style>
