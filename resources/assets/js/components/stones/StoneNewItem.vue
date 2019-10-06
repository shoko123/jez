<template>
  <stepper></stepper>
</template>

<script>
import stepper from "../elements/stepper";
export default {
  name: "stone-new-item",
  components: { stepper },
  created() {
    let steps = [];
    if (this.$store.getters["mgr/isCreate"]) {
      steps = [
        { name: "findRegistrationForm", step: 1, header: "Registration" },
        { name: "findNewDetails", step: 2, header: "Details" },
        { name: "StoneNew", step: 3, header: "Stone details" }

        /*
        { name: "findNewRegistration", step: 1, header: "Registration" },
        { name: "findNewDetails", step: 2, header: "Details" },
        { name: "GroundstoneNew", step: 3, header: "Groundstone details" }
        */
      ];
    } else {
      steps = [
        { name: "findNewDetails", step: 1, header: "Details" },
        { name: "StoneNew", step: 2, header: "Stone details" }
      ];
    }
    this.$store.commit("stp/stepArray", steps);
  }
};
</script>
