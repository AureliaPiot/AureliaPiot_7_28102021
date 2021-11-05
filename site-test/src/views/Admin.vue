<template>
  <div class="admin">
    <button v-on:click.prevent="$router.go(-1)">retour</button>

    <div class="row">

      <div class="col-md-2 element_admin">
        <div class="elt_title"><h3>filter</h3></div>
        <div class="elt_user"><h3>user</h3></div>
        <div class="elt_post"><h3>post</h3></div>

      </div>

      <div class="col-md-8 mx-auto">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>role</th>
                <th>nom</th>
                <th>prenom</th>
                <th>email</th>
                <th>number of post</th>
                <th>number of comment</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
                <adminController 
                  v-for="user in data"
                  :key="user"
                  :user="user"
                />
            </tbody>
          </table>
      </div>

    </div>
</div>
</template>

<script>


import adminController from '@/components/admin/admin_controller.vue'





export default {
  name: 'Home',
  data(){
     return{ 
       data:null,
     }
  },
  components: {
    adminController
  },
   methods:{
        // get all user
        getUsers(){
            console.log('get User');
            fetch('http://localhost:3000/api/user/', {
                method : "Get",
                headers: { 
                    "Content-Type": "application/json",
                    "authorization" : 'Bearer ' + localStorage.getItem('token'), 
                },
            }) 
            .then(function(res){
                return res.json();
            })    
            .then(value => (this.data = value, console.log(this.data) ))
            .catch(function(){
                console.log('erreur de requete');
            })
        },//getUsers
    },//methods
  beforeMount(){
    this.getUsers();
  },
}
</script>
<style scoped lang="scss">

.admin{
    // background: white;
  width: 100%;

  .row{
    margin:0
  }
}
.element_admin{
  background: white;
  margin: 0;
  h3{
  text-align: center;
  }

}
table{
  background: white;
  text-align: center;
  margin-bottom: 0;
  thead{
    font-size:1.2rem;
    font-weight: 600;
  }
}
</style>
