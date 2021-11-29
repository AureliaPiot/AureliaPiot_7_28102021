<template>
  <div >
    <!-- tentative d'ancre -->
    <!-- <div><a href="#head"><i class="btnUp fas fa-arrow-up"></i></a></div> -->
      <nav_home />
      <router-view/>
      
  </div>
</template>

<script>
// @ is an alias to /src
import nav_home from '@/components/home/nav_home.vue'


export default {
  name: 'Home',
  components: {
    nav_home,
  },
  methods:{
    getUserData(){
        this.$store.dispatch('userStore/getUserData',localStorage.getItem('userId'));
        //recuperation des donnée utilisateur connecté (pour son image de profile entre autre)

    }
  },
  computed:{},
  created(){
    this.getUserData()
  },
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

</style>
