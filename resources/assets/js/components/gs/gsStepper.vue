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
                <v-stepper-step step="1" :complete="step > 1">groundstone locator</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="step > 2">groundstone registration data</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3" :complete="step > 3">groundstone data</v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
                <findNewRegistration></findNewRegistration>
                <findNewDetails></findNewDetails>
                <gsNew></gsNew>
              </v-stepper-items>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import findNewRegistration from "../finds/findNewRegistration";
import findNewDetails from "../finds/findNewDetails";
import gsNew from "./gsNew";

export default {
  name: "gsStepper",
  components: { findNewRegistration, findNewDetails, gsNew },

  created() {
    //console.log("findCreate.created(). isCreate:" + this.isCreate);
  },

 
  data() {
    return {
    };
  },
  computed: {
   
    step: {
      get() {
        //return 1;
        return this.$store.getters["gss/step"];
      },
      set(data) {
        this.$store.commit("gss/step", data);
      }
    },

    headerMessage() {
      return "my header will show here"
      //return this.$store.getters["gs/newItemHeaderMessage"];
    }
  },
  methods: {}
};
</script>
