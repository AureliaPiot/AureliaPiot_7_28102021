<template>
  <div class="home col-md-10 mx-auto">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <TestComponents msgTest="welp, this it a test" /> -->

  
      <div class="col-md action_elt">
        <h2>action</h2>
      </div>

      <div class="col-md news_elt">
        <news_home msg="news"/>
      </div>
 
      <div class="col-md user_elt">
        <user_home msg="user"/>
      </div>
      
      <div class="col-md field_elt">
        <field_home msg="actu"/>
      </div>
      <!-- tout le defilement se fera ici -->

  
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import TestComponents from '@/components/test-component-1.vue'
import user_home from '@/components/home/user_home.vue'
import field_home from '@/components/home/field_home.vue'
import news_home from '@/components/home/news_home.vue'





export default {
  name: 'Home',
  components: {
    user_home,
    field_home,
    news_home

    // HelloWorld,
    // TestComponents
  }
}
</script>
<style scoped>
.home{
    margin-top: 4vw;
    display: grid;
    gap: 1vw;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 4vw 1fr;
    grid-template-areas: "action action news"
                          "user field news";

}
.action_elt{
  background: white;
  grid-area: action;

}
.user_elt{
  grid-area: user;
}
.news_elt{
  grid-area: news;
}

.field_elt{
  grid-area: field;

}
</style>
