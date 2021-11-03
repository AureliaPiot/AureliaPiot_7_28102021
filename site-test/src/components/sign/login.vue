<template>
    <div class="sign card p-md-5">
        <h2>connexion</h2>
        <form class="col-md-10 mx-auto">
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
            <button id="signLogin" type="submit" class="submit btn btn-primary">Entrée</button>
            <button id="goSign" type="submit" class="submit btn btn-primary"  >s'inscrire</button>
        </div>

        </form>

    </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    //   goSign : this.router.Push("sign")
  },
    method:{
    //   const singup = document.getElementById('goSign');
     goSign : this.router.Push("sign")
    },
    mounted(){
        console.log('test')
    }
}
</script>


<style scoped lang="scss">

</style>
