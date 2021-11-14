<template>

    <div class="allPost">

        <post
            v-for="post in this.post" 
            :key="post"
            :post="post" 
        />

      <!-- tout le defilement se fera ici -->
        
    </div>

</template>

<script>
// import{mapState} from 'vuex'
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
            post:null,
        }  
    },

    methods:{
        setData(){
            this.post = this.$store.state.postStore.post

        }
    },
     created(){
            console.log('get post :query');
            console.log(this.query);
            this.$store.dispatch('postStore/getPost',this.query);



            console.log('test state store');
            // console.log(this.$store.getters.allPosts)
            // setTimeout(this.data = this.$store.state.postStore.post,300);
            this.setData 

            setTimeout( this.setData ,100);

            console.log(this.post);


            // this.axios.get('http://localhost:3000/api/post/'+this.query, {
            //     headers: { 
            //         "Content-Type": "application/json",
            //         "authorization" : 'Bearer ' + localStorage.getItem('token'), 
            //     },
            // }) 
            // .then(response => {
            //     this.data = response.data
            //     console.log("response.data");

            //     console.log(response.data);
            // })
            // .catch(function(){
            //     console.log('erreur de requete');
            // })

            // this.data={...mapState(['postStore/posts'])}

        // },//getUsers
    },//methods
    Computed:{
        // setData(){
        //     this.post = this.$store.state.postStore.post

        // }
    },

    beforeMount(){
        this.setData

        //     setTimeout( this.setData ,200)
        //     this.data = this.$store.state.postStore.post
        //     console.log('test state store');
        //     console.log(this.$store.state.postStore.post)

    }

}
</script>

<style scoped lang="scss">
.allPost{
    width: 100%;
}
</style>