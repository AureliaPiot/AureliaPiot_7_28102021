<template>
    <div class="allPost" >
      

        <p v-if="getLoadinStatus =='loading'"> {{getLoadinStatus}} </p> 
        <post
            v-for="post in allPost " 
            :key="post"
            :post="post" 
            :query="this.query"

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
            post:null,
        }  
    },
    computed: {
        allPost(){
          return this.$store.state.postStore.posts

        },
        getLoadinStatus(){
          return this.$store.state.postStore.loadingStatus
        }  
    },
       beforeCreate(){
        this.$store.dispatch('postStore/getComs');



        
    },


}
</script>

<style scoped lang="scss">
.allPost{
    width: 100%;
}
</style>