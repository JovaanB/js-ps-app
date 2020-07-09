<template>
  <v-app>
    <window-bar style="-webkit-app-region: drag"></window-bar>
    <navigation></navigation>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-slide-x-transition mode="out-in">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </v-slide-x-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <window-footer></window-footer>
  </v-app>
</template>

<script>
import WindowBar from "@/components/WindowBar";
import WindowFooter from "@/components/WindowFooter";
import Navigation from "@/components/Navigation";
import jsxLib from "!!raw-loader!./photoshop/main.jsx";
import Messaging from "@/mixins/messaging";

export default {
  name: "App",

  mixins: [Messaging],

  components: {
    WindowBar,
    WindowFooter,
    Navigation,
  },

  data: () => ({
    //
  }),

  sockets: {
    connect() {
      // console.log("The client has connected!");
      // this.$socket.client.emit("jsxLib", jsxLib, (err, res) => {
      //   this.$store.dispatch("storeActions", res);
      // });
      this.runScript(jsxLib)
        .then((res) => {
          return this.runScript("ps.getActionsData()");
          // csInterface.evalScript()
        })
        .then((res) => {
          this.$store.dispatch("storeActions", res);
        })
        .catch((err) => console.log("Sad times...", err));
    },
    disconnect(reason) {
      console.log(`Disconnected: ${reason}`);
      if (reason === "transport close") {
        console.log("Photoshop has quitted");
      }
    },
    reconnect() {
      console.log("Thanks God we've reconnected!");
    },
  },

  created() {
    this.$store.dispatch(
      "storeProcessedImages",
      localStorage.processedImages || 0
    );
  },

  methods: {},
};
</script>
