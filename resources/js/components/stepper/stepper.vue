<template>
  <v-container fluid>
    <v-card class="mx-auto elevation-12">
      <v-card-title class="grey py-0">{{headerMessage}}</v-card-title>
      <v-card-text>
        <v-stepper v-model="step" vertical>
          <v-stepper-header>
            <template v-for="s in stepArray">
              <v-stepper-step
                :key="s.step"
                :complete="step > s.step"
                :step="s.step"
                class="orange--text"
              >{{ s.header }}</v-stepper-step>
              <v-divider v-if="n !== s.step" :key="s.name"></v-divider>
            </template>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content v-for="s in stepArray" :key="s.step" :step="s.step">
              <component v-bind:is="s.name" :key="s.step" :step="s.step"></component>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Registrar from "../registration/Registrar";
import LocusNew from "../loci/LocusNew";
import FindNew from "../finds/FindNew";
import PotteryNew from "../pottery/PotteryNew";
import StoneNew from "../stones/StoneNew";
import LithicNew from "../lithics/LithicNew";
import MetalNew from "../metal/MetalNew";
import GlassNew from "../glass/GlassNew";

export default {
  name: "stepper",

  components: {
    Registrar,
    LocusNew,
    FindNew,
    PotteryNew,
    StoneNew,
    LithicNew,
    MetalNew,
    GlassNew
  },

  computed: {
    stepArray() {
      return this.$store.getters["stp/steps"];
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
};
</script>

