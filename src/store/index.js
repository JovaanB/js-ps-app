import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    processedImages: 0,
  },
  getters: {
    processedImages(state) {
      return state.processedImages;
    },
  },
  mutations: {
    incrementProcessedImages(state) {
      state.processedImages++;
    },
    saveProcessedImages(state, payload) {
      if (payload) {
        state.processedImages = payload;
        localStorage.processedImages = payload;
      } else {
        localStorage.processedImages = state.processedImages;
      }
    },
  },
  actions: {
    storeProcessedImages(context, payload) {
      context.commit("saveProcessedImages", payload);
    },
  },
  modules: {},
});
