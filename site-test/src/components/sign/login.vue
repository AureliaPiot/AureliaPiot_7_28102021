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

            <div class="d-flex justify-content-center">
             <button id="signSubmit" type="button" class="submit btn btn-primary" v-on:click="login">Entrée</button>
            </div>

        </form>


</template>

<script>
export default {
  name: 'Login',
//   data(){
//   },
    methods:{
        login(){
            console.log('ok login');
            const data = {
                 email : document.getElementsByName("email_login")[0].value,
                 password : document.getElementsByName("password_login")[0].value,
                };

            fetch('http://localhost:3000/api/user/login', {
                method : "Post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }) 
            .then(function(res){
                if(res.ok){

                    this.router.push({ name: 'home' });
                    return 
                }                
                if(!res.ok){
                    return res.json();
                }
            })    
            .then(function(value){
                    console.log(value.message);
            })
   
            .catch(function(){
                console.log('erreur de requete');
            })
        }
    },

}
</script>


<style scoped lang="scss">

</style>
