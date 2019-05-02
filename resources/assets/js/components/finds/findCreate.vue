<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{headerMessage}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-stepper v-model="step" vertical>
              <v-stepper-header>
                <v-stepper-step step="1" :complete="step > 1">groundstone registration info</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="step > 2">groundstone data</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">media</v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
                <findRegistrationForm></findRegistrationForm>
                <groundstoneCreateForm></groundstoneCreateForm>
                <mediaCreateForm></mediaCreateForm>
              </v-stepper-items>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import findRegistrationForm from "./findRegistrationForm";
import groundstoneCreateForm from "../groundstone/groundstoneCreateForm";
import mediaCreateForm from "../media/mediaCreateForm";

export default {
  name: "find-create",
  components: { findRegistrationForm, groundstoneCreateForm, mediaCreateForm },

  created() {
    console.log("findRegistrationForm.created(). isCreate:" + this.isCreate);
  },

 
  data() {
    return {
    };
  },
  computed: {
    findFormData() {
      return this.$store.getters.findFormData;
    },
    step: {
      get() {
        return this.findFormData.step;
      },
      set(data) {
        this.$store.commit("step", data);
      }
    },

    headerMessage() {
      return this.$store.getters.headerMessage;
    }
  },
  methods: {}
};
</script>
