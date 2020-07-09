<template>
  <v-container>
    <v-row class="justify-center">
      <v-img src="@/assets/AppIcon.png" max-width="60" class="mb-4"></v-img>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="auto">
        <v-card min-width="350" class="px-12 py-4">
          <v-form ref="loginForm">
            <v-text-field label="User Name" v-model="userID" :rules="[rules.required]"></v-text-field>
            <v-text-field
              label="Serial Number"
              v-model="serialNO"
              :rules="[rules.required, rules.serialRule, rules.minValue]"
              v-mask="serialMask"
            ></v-text-field>
            <v-card-actions class="justify-center">
              <v-btn color="purple lighten-1" text @click="validate">Validate</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mask } from "vue-the-mask";
export default {
  directives: { mask },
  data() {
    return {
      userID: undefined,
      serialNO: undefined,
      rules: {
        required: value => !!value || "Required.",
        serialRule: () => true || "Not valid.",
        minValue: value => (value && value.length > 18) || "Not valid."
      },
      serialMask: "####-####-####-####"
    };
  },
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        localStorage.validation = JSON.stringify({
          userID: this.userID,
          serialNO: this.serialNO
        });
        this.$router.push({ path: "home" });
      }
    }
  },
  created() {
    if (localStorage.validation) {
      this.$router.push({ path: "home" });
    }
  }
};
</script>

<style></style>
