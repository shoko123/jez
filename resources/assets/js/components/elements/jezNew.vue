<template>
  <component v-bind:is="newItem"></component>
</template>

<script>
import gssNewItem from "../gs/gsNewItem";
export default {
  name: "jez-new", 
  components: { gssNewItem },
  computed: {
    newItem() {
      return this.$store.getters["mg/moduleName"] + 'NewItem';
    },  
  },
};
</script>

