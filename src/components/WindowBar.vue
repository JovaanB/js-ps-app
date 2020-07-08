<template>
  <v-system-bar window app>
    <span>PS Native App</span>
    <v-spacer></v-spacer>
    <v-icon @click="minimize" class="no-drag">mdi-window-minimize</v-icon>
    <v-icon @click="close" class="no-drag">mdi-close</v-icon>
  </v-system-bar>
</template>

<script>
export default {
  data() {
    return {
      // eslint-disable-next-line no-undef
      win: nw.Window.get(),
    };
  },
  methods: {
    minimize() {
      this.win.minimize();
    },
    close() {
      this.win.close();
    },
  },
};
</script>

<style>
.no-drag {
  -webkit-app-region: no-drag;
}
</style>
