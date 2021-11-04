<template>

    <div class="container-fluid">
<div class="row">
    <div class="col">
        user.name
    </div>
    <div class="col">
        user.lastname
    </div>
    <div class="col">
        user.email
    </div>
    <div class="col">
        user.role
    </div>
    <div class="col">

        <div class="row">
            <div class="col">
                delete
            </div>
            <div class="col">
                mute
            </div>
            <div class="col">
                promote
            </div>
        </div>

    </div>
</div>
        <!-- <h2>{{ msg }}</h2> -->


    </div>

</template>

<script>
export default {
    name:'user_home',
    // props: {
    //     msg: String
    // },
    methods:{

    },//methods


}
</script>

<style scoped lang="scss">
.container-fluid{
    background: white;
    width: 100%;
    height: 10vw;
}

</style>