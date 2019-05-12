<template>
    <div class="home">
        <!--主页入口-->


    </div>
</template>

<script>
    // @ is an alias to /src
    // import G2 from '@antv/g2'



    export default {
        name: 'home',
        data() {
            return {}
        },
        computed: {


        },
        mounted() {

        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">
    .home {
        min-height: 1080px;
        height: 100%;
        background-image: url('../assets/images/bj.png');

    }



    @media all and (min-height: 1080px) {
        .home {
            position: absolute;
            padding: 0px;
            margin: 0px;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            width: 100%;
            height: 100%;
            border: 0;
        }
    }


</style>

