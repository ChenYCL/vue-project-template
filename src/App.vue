<template>
    <div id="app">
        <!--    <router-link to="/">222</router-link>-->
        <router-view/>
    </div>
</template>
<script>
    import {imgPreload,readDir} from './plugins/imgImport'
    export default {
        name:'app',
        mounted() {
            // 一次性打包所有的静态图片资源
            const time = setTimeout(function () {
                imgPreload(readDir);
                clearTimeout(time)
            },4000)
        }
    }
</script>

<style lang="scss">
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #app{

    }
</style>
