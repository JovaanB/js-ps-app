<template>
  <v-app>
    <window-bar></window-bar>
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
export default {
  name: "App",

  components: {
    WindowBar,
    WindowFooter,
    Navigation
  },

  data: () => ({
    //
  }),

  methods: {}
};
</script>
