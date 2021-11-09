<template>

    <div class="allPost">
        <!-- <h2>Get post</h2> -->
        <!-- <p>{{this.data}}</p> -->
 
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
        // get all post
        // getPost(){
            console.log('get post');
            console.log(this.query);


            this.axios.get('http://localhost:3000/api/post/'+this.query, {
                headers: { 
                    "Content-Type": "application/json",
                    "authorization" : 'Bearer ' + localStorage.getItem('token'), 
                },
            }) 
            .then(response => {
                this.data = response.data
                // console.log(response)
                console.log(response.data);
            })
            .catch(function(){
                console.log('erreur de requete');
            })

        // },//getUsers
    },//methods
//   beforeMount(){
//     this.getPost();
//   },
}
</script>

<style scoped lang="scss">
.allPost{
    // background: white;
    width: 100%;
    // height: 10vw;
}
</style>