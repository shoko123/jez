<template>
  <div>
    <component v-bind:is="picker"></component>
  </div>
</template>

<script>
import findPicker from "../finds/findPicker";
import LocusPicker from "../loci/LocusPicker";

export default {
  name: "picker",
  components: { findPicker, LocusPicker },
  created() {
    console.log("picker,created");
  },
  computed: {
    picker() {
      switch (this.$store.getters["mgr/moduleItemName"]) {
        case "Groundstone":
        case "PotteryBasket":
          return findPicker;
          break;
          
        case "Locus":
          return LocusPicker;
          break;
      }
    }
  }
};
</script>