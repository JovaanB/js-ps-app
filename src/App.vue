<template>
  <v-app>
    <window-bar></window-bar>
    <window-footer></window-footer>
  </v-app>
</template>

<script>
import WindowBar from "@/components/WindowBar";
import WindowFooter from "@/components/WindowFooter";
export default {
  name: "App",

  components: {
    WindowBar,
    WindowFooter,
  },

  data: () => ({
    //
  }),

  methods: {},
};
</script>
