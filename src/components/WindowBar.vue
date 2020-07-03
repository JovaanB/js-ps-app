<template>
  <v-system-bar window app>
    <span>PS Native App</span>
    <v-spacer></v-spacer>
    <v-icon @click="log('clicked')">mdi-window-minimize</v-icon>
    <v-icon @click="log('clicked')">mdi-close</v-icon>
  </v-system-bar>
</template>

<script>
export default {
  methods: {
    log(s) {
      console.log(s);
    },
  },
};
</script>

<style></style>
