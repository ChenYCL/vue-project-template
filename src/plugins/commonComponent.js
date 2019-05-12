import Vue from 'vue';
// const userToolbar = () => import(/* webpackChunkName: "user" */ '../components/userToolbar');
// Vue.component('user-toolbar', userToolbar);
const box = ()=>import(/* webpackChunkName: "box" */ '../components/box')
Vue.component('r-box',box)