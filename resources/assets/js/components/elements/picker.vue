<template>
<div>
  <component v-bind:is="picker"></component>
</div>
</template>

<script>
import gssPicker from "../gs/gsPicker";
import findPicker from "../finds/findPicker";
export default {
  name: "picker", 
  components: { gssPicker, findPicker },
  computed: {
    picker() {
      //return this.$store.getters["mg/moduleName"] + 'Picker';
      return findPicker;
    },   
  },
};
</script>