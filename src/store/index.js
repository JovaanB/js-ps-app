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
    actions: [
      {
        actionSet: "ActionSet1",
        actions: ["Actions1", "Actions2", "Actions3"],
      },
      {
        actionSet: "ActionSet2",
        actions: ["Actions4", "Actions5", "Actions6"],
      },
      {
        actionSet: "ActionSet3",
        actions: ["Actions7", "Actions8", "Actions9"],
      },
    ],
  },
  getters: {
    processedImages(state) {
      return state.processedImages;
    },
    tags(state) {
      return state.tags;
    },
    actions(state) {
      return state.actions;
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
    saveActions(state, payload) {
      state.actions = payload;
    },
  },
  actions: {
    storeProcessedImages(context, payload) {
      context.commit("saveProcessedImages", payload);
    },
    storeTags(context, payload) {
      context.commit("saveTags", payload);
    },
    storeActions(context, payload) {
      context.commit("saveActions", payload);
    },
  },
  modules: {},
});
