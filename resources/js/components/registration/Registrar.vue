<template>
  <div v-if="regs">
    <v-row wrap>
      <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
    </v-row>
    <v-row wrap>
      <v-col xs12 sm6 class="px-2">
        <ElementAreaSeason />
      </v-col>
      <template v-if="showLocus">
        <v-col xs12 sm6 class="px-2">
          <ElementLocus />
        </v-col>
      </template>
    </v-row>

    <template v-if="showFind">
      <v-row wrap>
        <v-col xs12 sm12 class="px-2">
          <ElementFind />
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import ElementAreaSeason from "./ElementAreaSeason";
import ElementLocus from "./ElementLocus";
import ElementFind from "./ElementFind";
import StepButtons from "../stepper/StepButtons";

export default {
  components: { ElementAreaSeason, ElementLocus, ElementFind, StepButtons },
  created() {
    console.log("Registrar.created - loading areasSeasons");
    this.$store.dispatch("regs/loadAreasSeasons", null);
  },

  destroyed() {
    console.log("Registrar.destroyed");
  },

  data() {
    return {};
  },

  computed: {
    regs() {
      return this.$store.getters["regs/regs"];
    },
    isFind() {
      return this.$store.getters["mgr/status"].isFind;
    },
    showLocus() {
      return this.regs ? this.regs.areaSeasonSelected : false;
    },

    showFind() {
      return this.regs ? this.regs.locusSelected && this.isFind : false;
    },
  },

  methods: {
    nextClicked() {
      console.log(
        "Registrar.nextClicked: " +
          JSON.stringify(this.$store.getters["regs/newItem"], null, 2)
      );

      if (!this.regs.ready) {
        console.log("Registrar - validation error");
        this.$store.commit("stp/disableNextButton", true);
      } else {
        console.log("Registrar - validation passed - before next");
        this.$store.dispatch("regs/copyRegistration");
        this.$store.commit("stp/moveToStep", "next");
      }
    },
  },
};
</script>
