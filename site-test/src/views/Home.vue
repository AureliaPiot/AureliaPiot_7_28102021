<template>
  <div class="">
    
      <userTab msg="user"/>
 
      <div class="col-md-5 mx-auto main_elt">
          <router-view/>
      </div>

  </div>
</template>

<script>
// @ is an alias to /src
import userTab from '@/components/home/userTab_home.vue'


export default {
  name: 'Home',
  components: {
    userTab,
  },
  async beforeCreate(){
        await this.$store.dispatch('postStore/getCom');
  },
  methods:{
    
  }
}
</script>
<style lang="scss" scoped>
  .home{
      margin:0;
  }
  .action_elt{
    background: white;
    grid-area: action;
    .row{
      margin:0
    }
  }
  .user_elt{
    grid-area: user;
  }
  .news_elt{
    grid-area: news;
    margin-top: 3vw;
  }

  .main_elt{
    grid-area: main;
  }
</style>
