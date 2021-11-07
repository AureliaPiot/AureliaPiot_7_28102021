<template>
  <div class="home col-md-10 mx-auto">
  
 
      <div class="col-md user_elt">
        <userTab msg="user"/>
      </div>
      
      <div class="col-md main_elt">
          <router-view/>
      </div>

      <div class="col-md new_elt">
        <field msg="actu"/>
      </div>
  
  </div>
</template>

<script>
// @ is an alias to /src
import userTab from '@/components/home/userTab_home.vue'
import field from '@/components/home/field_home.vue'

export default {
  name: 'Home',
  components: {
    userTab,
    field,
  }
}
</script>
<style lang="scss" scoped>
  .home{
      margin-top: 4vw;
      display: grid;
      gap: 1vw;
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-rows: 4vw 1fr;
      grid-template-areas: "user main  news"
                            "user main news";

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
  }

  .main_elt{
    grid-area: main;
  }
</style>
