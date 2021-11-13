<template>

    <div>
        <userProfile/>
       <getPost :query="'/user/'+this.id" />
    </div>

</template>

<script>

import getPost from '@/components/home/post/get_post.vue'
import userProfile from '@/components/home/profile/userProfile.vue'


export default {
    name:'main_home',
    components:{
        userProfile,
        getPost
    },
    props: {
        msg: String
    },
       data(){  
       return{
            id :  this.$route.params.id,


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