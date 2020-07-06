<template>
  <v-form>
    <v-container>
      <input-files @input-change="updateInputFiles"></input-files>
      <tags :tags="tagsData" @tags-change="updateTags"></tags>
    </v-container>
  </v-form>
</template>

<script>
import InputFiles from "@/components/InputFiles";
import Tags from "@/components/Tags";

export default {
  components: {
    InputFiles,
    Tags
  },
  computed: {
    tagsData() {
      return this.$store.getters.tags;
    }
  },
  data() {
    return {
      files: []
    };
  },
  methods: {
    updateInputFiles(filesArray) {
      this.files = filesArray;
    },
    updateTags(tagsArray) {
      this.$store.dispatch("storeTags", tagsArray);
    }
  },

  created() {
    if (localStorage.tags) {
      this.$store.dispatch("storetags", JSON.parse(localStorage.tags));
    } else {
      localStorage.tags = JSON.stringify(this.$store.getters.tags);
    }
  }
};
</script>

<style>
</style>