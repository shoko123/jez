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
                <template v-for="s in stepArray">
                  <v-stepper-step
                    :key="s.step"
                    :complete="step > s.step"
                    :step="s.step"
                  >{{ s.header }}</v-stepper-step>

                  <v-divider v-if="n !== s.step" :key="s.name"></v-divider>
                </template>
              </v-stepper-header>
              <v-stepper-items>
        <v-stepper-content
          v-for="s in stepArray"
          :key="s.step"
          :step="s.step"
        >
        <component v-bind:is="s.name" :key="s.step" :step="s.step"></component>
          
        </v-stepper-content>

                <!--template v-for="s in stepArray">                
                  <component v-bind:is="s.name" :key="s.step" :step="s.step"></component>
                </template-->
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
import gsNew from "../gs/gsNew";

export default {
  name: "stepper",

  components: {
    findNewRegistration,
    findNewDetails,
    gsNew
  },
  created() {
    console.log("stepper.created(). list: " + JSON.stringify(this.stepArray, null, 2));
  },
 destroyed() {
    console.log("stepper.destroyed()");
  },
  data() {
    return {};
  },

  computed: {
    stepArray() {
      return this.$store.getters["stp/stepArray"];
    },
    n() {
      return this.stepArray.length;
    },

    headerMessage() {
      return this.$store.getters["stp/header"];
    },

    step: {
      get() {
        return this.$store.getters["stp/step"];
      },
      set(data) {
        this.$store.commit("stp/step", data);
      }
    }
  },
  methods: {}
};
</script>

