<template>
  <div class="admin col-md-10 mx-auto">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <TestComponents msgTest="welp, this it a test" /> -->

    <adminController 
      v-for="user in data"
      :key="user"
      :user="user"
     />
  
  <!-- {{data}} -->
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
<style scoped>

</style>
