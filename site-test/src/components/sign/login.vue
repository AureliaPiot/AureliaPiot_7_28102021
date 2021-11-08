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
            this.$store.dispatch('login',{
                // ici les element communiquer au store
                email : document.getElementsByName("email_login")[0].value,
                password : document.getElementsByName("password_login")[0].value,
            })

        },

    //     login(){
    //         console.log('ok login');
    //         const data = {
    //              email : document.getElementsByName("email_login")[0].value,
    //              password : document.getElementsByName("password_login")[0].value,
    //             };

    //         fetch('http://localhost:3000/api/user/login', {
    //             method : "Post",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(data),
    //         }) 
    //         .then(function(res){
    //             console.log(res);
           
    //                 // stoké le token quelque part 
    //                 // localStorage.setItem(Json.stringify(token));
    //                 console.log('redirection'); 
    //             return res.json();
    //         })    
    //         .then(function(value){
    //             if(value.token){
    //                 console.log(value);
    //                 localStorage.setItem("token",value.token);
    //                 localStorage.setItem("userId",value.userId);
    //                 localStorage.setItem("role",value.userRole);

    //                 // setTimeout(()=>{this.router.go("home")}, 400);//redirection apres 0.4sec
    //                 // this.router.push({name: "Home"});
    //                 // this.$router.go({ name: 'Home', query: { redirect: '/home' } });

    //             }
    //                 console.log(value.message);

    //         })
   
    //         .catch(function(){
    //             console.log('erreur de requete');
    //         })
    //     }
    }//methods

}
</script>


<style scoped lang="scss">

</style>
