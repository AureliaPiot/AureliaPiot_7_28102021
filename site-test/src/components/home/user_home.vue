<template>

    <div class="container">

        <h2>{{ msg }}</h2>
        <div class="info-user col-md-12">
            <p>User name+ lastname</p>
        </div>
        <div class="info-user col-md-12">
            <p>parametre compte</p>
        </div>
        <div class="info-user col-md-12">
            <p>post publier</p>
        </div>
        <div class="info-user col-md-12">
            <p>commentaire publier</p>
        </div>
        <!-- si admin -->
        <div class="info-user col-md-12">
            <p><router-link to="/admin">Admin</router-link></p>
        </div>
        <!-- si admin -->

    </div>

</template>

<script>
export default {
    name:'user_home',
    props: {
        msg: String
    }
}
</script>

<style scoped lang="scss">
.container{
    background: white;
    width: 100%;
    // height: 10vw;
}
.info-user{
    border-top: 1px solid rgb(118, 120, 124);
    // border-bottom: 1px solid rgb(118, 120, 124);

    text-align: center;
}
</style>