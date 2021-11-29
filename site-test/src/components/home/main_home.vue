<template>

    <div class="col-xl-5 col-md-8 mx-auto">
        <newPost v-if="this.role !== 'mute'"/>
        <getPost query='all'/>
    </div>

</template>

<script>
import newPost from '@/components/home/post/new_post.vue'
import getPost from '@/components/home/post/get_post.vue'

export default {
    name:'main_home',
    components:{
        newPost,
        getPost
    },
    props: {
        msg: String
    },
    data(){  
        return{
            role : localStorage.getItem('role')
            }
    },
    beforeCreate(){
    this.$store.dispatch('postStore/getPost','all')
  },
}

</script>

<style scoped lang="scss">
</style>