<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col align="center">
        <v-img src="@/assets/AppIcon.png" max-width="150"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <p class="headline">PS Native App</p>
        <p
          class="body-2 text--secondary font-weight-light"
        >Used so far to process {{ processedImages }} images</p>
        <p class="overline">
          Made by
          <a href="mailto:bienvenujovan@gmail.com" class="cyan--text text--darken-2">Jovan</a> with ❤️
        </p>
        <v-btn color="success" @click="oneMore">Increase</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    processedImages() {
      return this.$store.getters.processedImages;
    }
  },
  methods: {
    oneMore() {
      this.$store.commit("incrementProcessedImages");
      this.$store.dispatch("storeProcessedImages");
    }
  }
};
</script>

<style>
</style>