<template>

    <div class="allPost">

        <post
            v-for="post in this.data" 
            :key="post"
            :post="post" 
        />

      <!-- tout le defilement se fera ici -->
        
    </div>

</template>

<script>
import post from '@/components/home/post/gettedPost/singlePost.vue'

export default {
    name:'getPost',
    components: {
    post
  },
    props: {
        query: String
    },
      data(){
        return{ 
        data:null,
        }  
    },

    // methods:{
    mounted() {
            console.log('get post :query');
            console.log(this.query);


            this.axios.get('http://localhost:3000/api/post/'+this.query, {
                headers: { 
                    "Content-Type": "application/json",
                    "authorization" : 'Bearer ' + localStorage.getItem('token'), 
                },
            }) 
            .then(response => {
                this.data = response.data
                // console.log(response.data);
            })
            .catch(function(){
                console.log('erreur de requete');
            })

        // },//getUsers
    },//methods

}
</script>

<style scoped lang="scss">
.allPost{
    width: 100%;
}
</style>