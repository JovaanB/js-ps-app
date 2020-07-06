<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-subtitle class="subtitle-1">Image Processing Tags</v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
          <v-chip
            v-for="tag in tags"
            :key="tag.name"
            class="mx-1"
            :color="tag.active ? 'green' : 'grey'"
            @click="toggleTag(tag)"
          >{{ tag.name }}</v-chip>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["tags"],
  methods: {
    toggleTag(t) {
      t.active = !t.active;
      this.$emit("tags-change", this.tags);
    }
  }
};
</script>

<style></style>