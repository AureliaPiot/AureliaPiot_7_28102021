<template>

        <form class="col-md-10 mx-auto"> 


            <div class="form-group my-md-4">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email"  placeholder="Enter email" name="email_login" required>
            </div>
            <div class="form-group my-md-4">
                <label for="password_input">Password</label>
                <input type="password" class="form-control" id="password_input" placeholder="Password" aria-describedby="passwordHelp" name="password_login" autocomplete="off" required>
                <small id="passwordHelp" class="form-text text-muted"> never share your password with anyone else.</small>
            </div>

        </form>


</template>

<script>
export default {
  name: 'Login',
//   data(){
//   },
    method:{

        submit(){
            console.log('ok submit');
            const email = document.getElementsByName("email_login");
            const password = document.getElementsByName("password_login");
            console.log(email , password);
        }
    },

}
</script>


<style scoped lang="scss">

</style>
