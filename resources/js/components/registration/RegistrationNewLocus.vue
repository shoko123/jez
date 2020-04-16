<template>
  <form>
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
    <v-row wrap>
      <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
    </v-row>
  </form>
</template>

<script>
import ElementAreaSeason from "../registration/ElementAreaSeason";
import ElementLocus from "../registration/ElementLocus";
import StepButtons from "../stepper/StepButtons";

export default {
  components: { ElementAreaSeason, ElementLocus, StepButtons },

  created() {
    console.log("RegistrationNewLocus.created");
    this.$store.commit("stp/disableNextButton", true);
  },

  destroyed() {
    console.log("RegistrationNewLocus.destroyed");
  },

  computed: {
    regs() {
      return this.$store.getters["regs/regs"];
    },

    showLocus() {
      return this.regs.areaSeasonSelected;
    },

  },

  methods: {
    submitForm() {
      console.log("next()");
      this.$store.dispatch("regs/copyRegistration");
      this.$store.commit("stp/moveToStepthis", "next");
    },
    
    nextClicked() {
      console.log(
        "RegistrationNewLocus.nextClicked: " +
          JSON.stringify(this.$store.getters["loci/newItem"], null, 2)
      );

      if (!this.regs.ready) {
        console.log("RegistrationNewLocus.Validation error");
        this.$store.commit("stp/disableNextButton", true);
      } else {
        console.log("validation passed - before next");
        this.$store.dispatch("regs/copyRegistration");
         this.$store.commit("stp/moveToStep","next");
      }
    },
    
  }
};
</script>
