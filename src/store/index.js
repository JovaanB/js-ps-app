import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    processedImages: 0,
    tags: [
      { name: "lynx", active: true },
      { name: "lion", active: true },
      { name: "tiger", active: false },
      { name: "siamese", active: true },
    ],
  },
  getters: {
    processedImages(state) {
      return state.processedImages;
    },
    tags(state) {
      return state.tags;
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
        localStorage.processedImages = JSON.stringify(state.processedImages);
      }
    },
    saveTags(state, payload) {
      state.tags = payload;
      localStorage.tags = JSON.stringify(payload);
    },
  },
  actions: {
    storeProcessedImages(context, payload) {
      context.commit("saveProcessedImages", payload);
    },
    storeTags(context, payload) {
      context.commit("saveTags", payload);
    },
  },
  modules: {},
});
