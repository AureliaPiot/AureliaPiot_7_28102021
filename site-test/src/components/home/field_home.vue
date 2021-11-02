<template>

    <div class="container">
        <h2>{{ msg }}</h2>
        
    </div>

</template>

<script>
export default {
    name:'field_home',
    props: {
        msg: String
    }
}
</script>

<style scoped lang="scss">
.container{
    background: white;
    width: 100%;
    height: 10vw;
}
</style>