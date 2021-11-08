<template>
  <!-- <div id="nav">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Hello</span>
            <form class="d-flex">
            <input class="form-control " type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        <router-link v-bind:to="{name: 'Sign'}">Sign</router-link> 
        <router-link to="/home">Home</router-link> 
        <router-link to="/about">About</router-link>
        <button @click="signOut">sign out</button>
      </div>
    </nav>
  </div> -->
  <router-view/>


</template>

<script>

export default {
      methods:{
        
    },//methods

}
</script>

<style lang="scss">
body{
  background-color:#f3f6f8;
  a{
    text-decoration: none;
    color: black;
  }
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;

}

// #nav {
//   // padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
