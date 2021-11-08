<template>
  <div class="">
    

        <userTab msg="user"/>
 
      <!-- <div class="col-md user_elt">
      </div> -->


  
      
      <div class="col-md-5 mx-auto main_elt">
          <router-view/>
      </div>

      <!-- <div class="col-md new_elt">
        <field msg="actu"/>
      </div> -->
  
  </div>
</template>

<script>
// @ is an alias to /src
import userTab from '@/components/home/userTab_home.vue'
// import field from '@/components/home/field_home.vue'

export default {
  name: 'Home',
  components: {
    userTab,
    // field,
  },
  methods:{
    
  }
}
</script>
<style lang="scss" scoped>
  .home{
      margin:0;
      // display: grid;
      // gap: 1vw;
      // grid-template-columns: 1fr 2fr 1fr;
      // grid-template-rows: 4vw 1fr;
      // grid-template-areas: "user main  news"
      //                       "user main news";

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
