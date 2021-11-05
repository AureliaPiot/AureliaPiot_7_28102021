<template>

<tr>
    <td>{{user.role}}</td>
    <td>{{user.nom}}</td>
    <td>{{user.prenom}}</td>
    <td>{{user.email}}</td>
    <td><p>number of post</p></td>
    <td><p>number of comment</p></td>
    <td> 
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
    </td>
</tr>



   
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


</style>