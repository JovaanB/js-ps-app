<template>
  <v-form>
    <v-container>
      <input-files @input-change="updateInputFiles"></input-files>
      <tags :tags="tagsData" @tags-change="updateTags"></tags>
      <actions :actionsData="actionsData" @actions-change="updateActionsObject"></actions>
      <v-btn
        color="pink"
        fab
        absolute
        bottom
        right
        class="mb-4 mr-2"
        :disabled="files.length === 0"
        @click="runProcess"
      >
        <v-icon>mdi-play</v-icon>
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import InputFiles from "@/components/InputFiles";
import Tags from "@/components/Tags";
import Actions from "@/components/Actions";
import Messaging from "@/mixins/messaging";

export default {
  components: {
    InputFiles,
    Tags,
    Actions
  },
  computed: {
    tagsData() {
      return this.$store.getters.tags;
    },
    actionsData() {
      return this.$store.getters.actions;
    }
  },
  mixins: [Messaging],
  data() {
    return {
      files: [],
      actionsObj: {}
    };
  },
  methods: {
    updateInputFiles(filesArray) {
      this.files = filesArray;
    },
    updateTags(tagsArray) {
      this.$store.dispatch("storeTags", tagsArray);
    },
    updateActionsObject(actionsObject) {
      this.actionsObj = actionsObject;
    },
    async runProcess() {
      let payload = {
        files: this.files.map(f => f.path),
        tags: this.tagsData.filter(tag => tag.active).map(tag => tag.name),
        actions: this.actionsObj
      };
      for (let i = 0; i < payload.files.length; i++) {
        await this.sendMessage("getThumbnail", payload.files[i]).then(res =>
          console.log(res)
        );
      }
    }
  },

  created() {
    if (localStorage.tags) {
      this.$store.dispatch("storeTags", JSON.parse(localStorage.tags));
    } else {
      localStorage.tags = JSON.stringify(this.$store.getters.tags);
    }
  }
};
</script>

<style>
</style>