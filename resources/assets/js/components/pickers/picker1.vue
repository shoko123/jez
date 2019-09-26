<template>
  <div>
    <component v-bind:is="picker"></component>
  </div>
</template>

<script>
import pickerNew from "./pickerNew";
import pickerExisting from "./pickerExisting";

export default {
  name: "picker",
  components: { pickerNew, pickerExisting },
  created() {
    console.log("picker.created");
  },
  computed: {
    picker() {
      if (this.$store.getters["mgr/isCreate"]) {
        return pickerNew;
      } else {
        return pickerExisting;
      }
    }
  }
};
</script>