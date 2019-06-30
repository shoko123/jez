<template>
<div>
  <component v-bind:is="picker"></component>
</div>
</template>

<script>
import gssPicker from "../gs/gsPicker";
export default {
  name: "picker", 
  components: { gssPicker },
  computed: {
    picker() {
      return this.$store.getters["mg/moduleName"] + 'Picker';
    },   
  },
};
</script>