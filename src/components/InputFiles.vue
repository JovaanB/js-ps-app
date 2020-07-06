<template>
  <v-row dense>
    <v-col>
      <v-file-input
        v-model="selectedFiles"
        multiple
        counter
        show-size
        accept="image/*"
        label="Files"
        hint="Select input Files"
        @change="$emit('input-change', selectedFiles)"
      >
        <template v-slot:selection="{ index, text }">
          <v-chip
            small
            label
            color="primary"
            close
            @click:close="removeFile(index)"
            v-if="index < 3"
          >{{ text }}</v-chip>
          <span
            v-else-if="index === 3"
            class="caption ml-2 grey--text"
          >+ {{ selectedFiles.length - 3 }} file(s)</span>
        </template>
      </v-file-input>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      selectedFiles: []
    };
  },
  methods: {
    removeFile(idx) {
      this.selectedFiles.splice(idx, 1);
    }
  }
};
</script>

<style>
</style>