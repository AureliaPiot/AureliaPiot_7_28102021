<template>

    <div class="allPost">

        <post
            v-for="post in this.$store.state.postStore.post " 
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
    computed: {
      
    },
    methods:{
  
    },
    beforeCreate(){
        this.$store.dispatch('postStore/getPost',this.query);
    },
     created(){
    },
    beforeMount(){
    },
    mounted(){
    }

}
</script>

<style scoped lang="scss">
.allPost{
    width: 100%;
}
</style>