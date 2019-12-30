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
    if (this.$store.getters["mgr/status"].isCreate) {
      steps = [
        { name: "FindNewRegistration", step: 1, header: "Registration" },
        { name: "FindNew", step: 2, header: "Details" },
        { name: "StoneNew", step: 3, header: "Stone details" }
      ];
    } else {
      steps = [
        { name: "FindNew", step: 1, header: "Details" },
        { name: "StoneNew", step: 2, header: "Stone details" }
      ];
    }
    this.$store.commit("stp/stepArray", steps);
  }
};
</script>
