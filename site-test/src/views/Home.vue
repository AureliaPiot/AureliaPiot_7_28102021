<template>
  <div >
    <!-- tentative d'ancre -->
    <!-- <div class=""><a href="#head"><i class="btnUp fas fa-arrow-up"></i></a></div> -->
      <userTab msg="user"/>
 
      <div class="col-xl-5 col-md-8 mx-auto main_elt">
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

  methods:{
    
  }
}
</script>
<style lang="scss" scoped>
  .btnUp{
     width: 5rem;
    padding: 1rem;

    background: #1f4988;
    border-radius: 50%;

    position: fixed;
    z-index: 10;
    bottom: 2rem;
    right: 7%;

    text-align: center;
    font-size: 3rem;
    color: white;
  }
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
