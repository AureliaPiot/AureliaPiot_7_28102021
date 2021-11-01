<template>
    <div class="root">
        <h1 class="titre">Hello-test</h1>
        <div id="test" >
            {{msgTest}}
        </div>
        <div >  {{count}}  </div>
        <div v-for="number in elements" v-bind:key="number">  {{number}}  </div>

    </div>
</template>

<script>
export default {
  name: 'TestComponents',
   data(){  
       return{
            count:0,
            elements:[1,2,3,4,5,6,7,8],
        }
  },
  props: {
    msgTest: String
  }
}
// https://practicalprogramming.fr/nodejs-mysql pour un tuto sur mysql et nodejs
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1{
    color: rgb(17, 52, 66);
}
.div{
    color: rgb(189, 35, 35);
}
</style>
