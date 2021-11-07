<template>

    <div >
        <newPost/>
        <getPost query="all"/>
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

        }
  },
  methods:{

      }
  }


</script>

<style scoped lang="scss">
.container{
    background: white;
    width: 100%;
    // height: 10vw;
}
.info-user{
    border-top: 1px solid rgb(118, 120, 124);
    // border-bottom: 1px solid rgb(118, 120, 124);

    text-align: center;
}
</style>