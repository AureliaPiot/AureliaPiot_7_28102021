<template>

    <div class="container-fluid">
             
<div class="row">
    <div class="col">
        {{user.nom}}
    </div>
    <div class="col">
        {{user.prenom}}
    </div>
    <div class="col">
        {{user.email}}
    </div>
    <div class="col">
        {{user.role}}
    </div>
    <div class="col">
       <p>number of post</p>
    </div>
    <div class="col">
       <p>number of comment</p>
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
   


    </div>

</template>

<script>
export default {
    name:'user_home',
    props: {
        user: Object
    },
    methods:{

    },//methods


}
</script>

<style scoped lang="scss">
.container-fluid{
    background: white;
    width: 100%;
    height: 1vw;
}

</style>