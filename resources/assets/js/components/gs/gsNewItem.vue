<template>
  <stepper></stepper>
</template>

<script>
import stepper from "../elements/stepper";
export default {
  name: "gs-new-item",
  components: { stepper },
  created() {
    let steps = [];
    if (this.$store.getters["mg/isCreate"]) {
      steps = [
        { name: "findNewRegistration", step: 1, header: "Registration" },
        { name: "findNewDetails", step: 2, header: "Details" },
        { name: "gsNew", step: 3, header: "Groundstone details" }
      ];
    } else {
      steps = [
        { name: "findNewDetails", step: 1, header: "Details" },
        { name: "gsNew", step: 2, header: "Groundstone details" }
      ];
    }
    this.$store.commit("stp/stepArray", steps);
  }
};
</script>
