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
  </form>
</template>

<script>
import ElementAreaSeason from "../registration/ElementAreaSeason";
import ElementLocus from "../registration/ElementLocus";

export default {
  components: { ElementAreaSeason, ElementLocus },

  mounted() {
    this.$root.$on("stepperNextClicked", () => {
      console.log("RegistrationNewLocus NextClicked Event");
      this.submitForm();
    });
  },

  created() {
    console.log("RegistrationNewLocus.created");
    this.handleNextButton();
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
    }
  },

  methods: {
    submitForm() {
      console.log("next()");
      this.$store.dispatch("regs/copyRegistration");
      this.step++;
    },
    handleNextButton() {
      this.$store.commit("stp/disableNextButton", !this.regs.ready);
    }
  }
};
</script>
