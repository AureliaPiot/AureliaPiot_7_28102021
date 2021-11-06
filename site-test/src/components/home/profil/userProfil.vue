<template>
    <div class="root">
        <h1 class="titre">User-profile-test</h1>
        <div id="test" >
            {{msgTest}}
        </div>
    </div>
</template>

<script>
export default {
  name: 'user-profile',
   data(){  
       return{
            count:0,
            elements:[1,2,3,4,5,6,7,8],
        }
  },
  props: {
    user: String
  }
}

</script>

<style scoped lang="scss">
h1{
    color: rgb(17, 52, 66);
}
.div{
    color: rgb(189, 35, 35);
}
</style>
