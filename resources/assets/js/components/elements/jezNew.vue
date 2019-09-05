<template>
  <component v-bind:is="newItem"></component>
</template>

<script>
import GroundstoneNewItem from "../gs/GroundstoneNewItem";
import LocusNewItem from "../loci/LocusNewItem";


export default {
  name: "jez-new", 
  components: { GroundstoneNewItem, LocusNewItem },
  computed: {
    newItem() {
      return this.$store.getters["mgr/moduleItemName"] + 'NewItem';
    },  
  },
};
</script>

