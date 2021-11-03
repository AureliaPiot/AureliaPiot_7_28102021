<template>
    <div class="sign card p-md-5">
        <h2>connexion</h2>
        <form class="col-md-10 mx-auto">
            <div class="form-group my-md-4">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email"  placeholder="Enter email" name="email">
            </div>
            <div class="form-group my-md-4">
                <label for="password_input">Password</label>
                <input type="password" class="form-control" id="password_input" placeholder="Password" aria-describedby="passwordHelp" name="password">
                <small id="passwordHelp" class="form-text text-muted"> never share your password with anyone else.</small>
            </div>

        <div class="d-flex justify-content-between">
            <button id="signLogin" type="button" class="submit btn btn-primary"  @click="$submit">Entrée</button>
            <router-link  tag="button" id="goSign" class="submit btn btn-primary" @click="this.$forceUpdate()" to="/sign">s'inscrire</router-link>
        </div>

        </form>

    </div>
</template>

<script>
export default {
  name: 'Login',
//   data(){
//   },
    method:{
      url_Sign(){
        //   this.$router.push("/sign");
        
        },
        submit(){
            console.log('ok submit');
            this.$forceUpdate();
            const email = document.getElementsByName("email");
            console.log(email);
        }
    },
    mounted(){
    }
}
</script>


<style scoped lang="scss">

</style>
