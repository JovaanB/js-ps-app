<template>
  <v-navigation-drawer app permanent mini-variant>
    <v-list dense>
      <v-list-item>
        <v-list-item-icon>
          <v-icon class="green--text" @click="goto('/')">mdi-link-variant</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-icon>
          <v-icon @click="goto('/home')">mdi-home</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon @click="goto('/process')">mdi-cogs</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  methods: {
    goto(route) {
      // eslint-disable-next-line
      this.$router.push({ path: route }).catch(err => {});
    }
  }
};
</script>

<style></style>
