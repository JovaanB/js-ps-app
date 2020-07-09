import Vue from "vue";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";

const socket = io("http://localhost:8099");

Vue.use(VueSocketIOExt, socket);
