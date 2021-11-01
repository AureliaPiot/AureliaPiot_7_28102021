<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <TestComponents msgTest="welp, this it a test" />

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import TestComponents from '@/components/test-component-1.vue'


export default {
  name: 'Home',
  components: {
    HelloWorld,
    TestComponents
  }
}
</script>
