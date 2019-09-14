<template>
  <stepper></stepper>
</template>

<script>
import stepper from "../elements/stepper";
export default {
  name: "locus-new-item",
  components: { stepper },
  created() {
    let steps = [];
    if (this.$store.getters["mgr/isCreate"]) {
steps = [
        { name: "LocusPickerNewForm", step: 1, header: "Locus registration" },
        { name: "LocusNew", step: 2, header: "Locus details" },
      ];
      /*
      steps = [
        { name: "LocusNewRegistration", step: 1, header: "Locus registration" },
        { name: "LocusNew", step: 2, header: "Locus details" },
      ];
    */


    } else {
      steps = [
        { name: "LocusNew", step: 1, header: "Locus details" },
      ];
    }
    this.$store.commit("stp/stepArray", steps);
  }
};
</script>
