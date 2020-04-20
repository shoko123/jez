<template>
  <div v-if="regs">
    <v-row wrap>
      <v-col xs12 sm6 class="px-2">
        <ElementAreaSeason />
      </v-col>
      <template v-if="areaSeasonSelected">
        <v-col xs12 sm6 class="px-2">
          <ElementLocus />
        </v-col>
      </template>
    </v-row>

    <template v-if="locusSelected">
      <v-row wrap>
        <v-col xs12 sm12 class="px-2">
          <ElementFind />
        </v-col>
      </v-row>
    </template>
    
    <v-row wrap>
      <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
    </v-row>
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
    console.log("RegistrationNewFind.created");
  },
  destroyed() {
    console.log("RegistrationNewFind.destroyed");
  },

  data() {
    return {};
  },

  computed: {
    regs() {
      return this.$store.getters["regs/regs"];
    },
    areaSeasonSelected() {
      return this.regs.areaSeasonSelected;
    },
    areaSeason() {
      return this.regs.areaSeason;
    },
    locusSelected() {
      return this.regs.locusSelected;
    },
    locus() {
      return this.regs.locus;
    }
  },

  methods: {
    nextClicked() {
      console.log(
        "RegistrationNewFind.nextClicked: " +
          JSON.stringify(this.$store.getters["regs/newItem"], null, 2)
      );

      if (!this.regs.ready) {
        console.log("RegistrationNewLocus.Validation error");
        this.$store.commit("stp/disableNextButton", true);
      } else {
        console.log("validation passed - before next");
        this.$store.dispatch("regs/copyRegistration");
        this.$store.commit("stp/moveToStep", "next");
      }
    }
  }
};
</script>
