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
        @click="runProcess"
        :disabled="files.length === 0"
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

  mixins: [Messaging],

  data() {
    return {
      files: [],
      actionsObj: {},
      classifier: undefined
    };
  },
  computed: {
    tagsData() {
      return this.$store.getters.tags;
    },
    actionsData() {
      return this.$store.getters.actions;
    }
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
      console.log(payload);

      let processedOnes = 0;

      for (let i = 0; i < payload.files.length; i++) {
        await this.sendMessage("getThumbnail", payload.files[i])
          .then(res => {
            let imageData = Uint8ClampedArray.from(Object.values(res.pixmap));
            return this.classifier
              .classify(new ImageData(imageData, res.width, res.height), 4)
              .then(res => {
                console.log(res);
                if (this.isTagInResults(res, payload.tags)) {
                  // run the action
                  this.runScript(
                    `ps.runAction("${payload.actions.action}", "${payload.actions.actionSet}")`
                  );
                  processedOnes++;
                  this.$store.commit("incrementProcessedImages");
                } else {
                  // skip and close
                  this.runScript(`app.activeDocument.close()`);
                }
              })
              .catch(err => console.log("Can't classify...", err));
          })
          .catch(err => console.log("Shit happened..."));
      }

      this.$store.dispatch("storeProcessedImages");

      const notification = new Notification("Batch Complete!", {
        body: `Processed ${processedOnes} document${
          processedOnes > 1 ? "s" : ""
        } out of ${payload.files.length}`
      });
    },

    /**
     * Returns true if a tag in the tags array is present in the results array
     * @param {Array.<Object>} results coming straight from ml5 classifier
     *                                 [{ label:String, confidence:Number }]
     * @param {Array.<String>} tags e.g. ["cat", "dog", "dingo"]
     * @param {Number} [resultsNumber] used to limit the research to N results
     *                                 Default = 3
     * @param {Number} [confidenceThreshold] accepts the result only if the confidence is >= of this value
     *                                       Default = 0.5
     */
    isTagInResults(
      results,
      tags,
      resultsNumber = 3,
      confidenceThreshold = 0.5
    ) {
      console.log("tags", tags);
      let reducedResults = results.slice(0, resultsNumber);
      console.log("reducedResults", reducedResults);
      return tags.some(tag => {
        return reducedResults.some(result => {
          return (
            result.label.toLowerCase().indexOf(tag.toLowerCase()) != -1 &&
            result.confidence >= confidenceThreshold
          );
        });
      });
    }
  },
  created() {
    this.classifier = this.$ml5.imageClassifier("ml5/model.json", () =>
      console.log("Model ready!")
    );

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