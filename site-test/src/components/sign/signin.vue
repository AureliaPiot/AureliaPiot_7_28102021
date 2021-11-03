<template>
    <div class="sign card p-md-5">
        <h2>inscription</h2>
        <form class="col-md-10 mx-auto">
            <div class="form-group my-md-4">
                <label for="nom_input">Nom</label>
                <input type="text" class="form-control" id="nom_input"  placeholder="nom">
            </div>
            <div class="form-group my-md-4">
                <label for="prenom_input">Prenom</label>
                <input type="text" class="form-control" id="prenom_input"  placeholder="prenom">
            </div>
            <div class="form-group my-md-4">
                <label for="email_input">Email</label>
                <input type="email" class="form-control" id="email_input"  placeholder="Enter email">
            </div>
            <div class="form-group my-md-4">
                <label for="password_input">Password</label>
                <input type="password" class="form-control" id="password_input" placeholder="Password" aria-describedby="passwordHelp">
                <small id="passwordHelp" class="form-text text-muted"> never share your password with anyone else.</small>

            </div>

            
            <div class="d-flex justify-content-between">
                <button id="signSubmit" type="submit" class="submit btn btn-primary">Entrée</button>
                <button id="goLogin" type="submit" class="submit btn btn-primary"  @click="url_Login" >se connecter</button>
            </div>
        </form>

    </div>
</template>

<script>
export default {
  name: 'SignIn',
  methodes:{
      url_Login(){
          this.$router.push('/login')
        } 
  }
}
</script>


<style scoped lang="scss">

</style>
