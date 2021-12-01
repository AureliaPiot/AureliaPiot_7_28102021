<template>

    <div class="col-xl-5 col-md-8 mx-auto">
        <userProfile/>
        <getPost :query="'user/'+this.id" />
    </div>

</template>

<script>

import getPost from '@/components/home/post/get_post.vue'
import userProfile from '@/components/home/profile/userProfile.vue'


export default {
    name:'main_home',
    components:{
        userProfile,
        getPost
    },
    props: {
        msg: String
    },
       data(){  
       return{
            id :  this.$route.params.id,
            //recupere l'id de l'url de base au "chargement" du composant
        }
    },
    methods:{},
    watch: {
    '$route' () {
        if(this.$route.name !== "HomePage" && this.$route.name !== "Sign"){
            this.id = this.$route.params.id;
            this.$store.dispatch('userStore/getUserProfile',this.$route.params.id);
            this.$store.dispatch('postStore/getPost','user/'+this.$route.params.id);
        }
        //réinsitialisation des donnée aux changement des parametres dans l'url
        // sauf si la route s'appele "HomePage"et "Sign", on evite d'initier des données vide
        //meme en "sortant" du composant il ecoute toujours la "route"

        }
    },
    beforeCreate(){
        this.$store.dispatch('userStore/getUserProfile',this.$route.params.id);
        this.$store.dispatch('postStore/getPost','user/'+this.$route.params.id);
        // il est important d'initialiser les données au "chargement" du composant
    },
}


</script>

<style scoped lang="scss">
</style>