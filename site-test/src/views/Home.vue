<template>
  <div class="home col-md-10 mx-auto">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <TestComponents msgTest="welp, this it a test" /> -->

  
      <div class="col-md action_elt">
        <h2>action</h2>
        <div class="row">
          
          <div class="col"> home </div>
          <div class="col">search</div>
          <div class="col"><router-link to="/new/post">new Post</router-link></div>

        </div>
      </div>

      <div class="col-md getPost_elt">
        <!-- <getPost_home msg="news"/> -->
        <field_home msg="actu"/>

      </div>
 
      <div class="col-md user_elt">
        <user_home msg="user"/>
      </div>
      
      <div class="col-md field_elt">
          <router-view/>
      </div>

  
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import TestComponents from '@/components/test-component-1.vue'
import user_home from '@/components/home/user_home.vue'
import field_home from '@/components/home/field_home.vue'
// import getPost_home from '@/components/home/getPost_home.vue'





export default {
  name: 'Home',
  components: {
    user_home,
    field_home,
    // HelloWorld,
    // TestComponents
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
    grid-template-areas: "action action news"
                          "user field news";

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

.field_elt{
  grid-area: field;
}
</style>
