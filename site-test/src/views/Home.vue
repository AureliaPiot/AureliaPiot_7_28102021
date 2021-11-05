<template>
  <div class="home col-md-10 mx-auto">
  
      <div class="col-md getPost_elt">
        <!-- <getPost_home msg="news"/> -->
        <field_home msg="actu"/>

      </div>
 
      <div class="col-md user_elt">
        <user_home msg="user"/>
      </div>
      
      <div class="col-md field_elt">
        <newPost_home/>
        <getPost_home/>
          <!-- <router-view/> -->
      </div>

  
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import TestComponents from '@/components/test-component-1.vue'
import user_home from '@/components/home/user_home.vue'
import field_home from '@/components/home/field_home.vue'
import newPost_home from '@/components/home/post/new_post.vue'
import getPost_home from '@/components/home/post/getPost_home.vue'





export default {
  name: 'Home',
  components: {
    user_home,
    field_home,
    newPost_home,
    getPost_home

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
    grid-template-areas: "user field  news"
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
