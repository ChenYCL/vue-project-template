import Vue from 'vue'
import Vuex from 'vuex'
import api from "./plugins/api";
import axios from "./plugins/apiConfig";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    "test":'test2'
  },
  mutations: {
    test(state, data) {
      state.test = data;
    },
  },
  actions: {

  }
});
