<template>
  <component v-bind:is="newItem"></component>
</template>

<script>
import GroundstoneNewItem from "../gs/GroundstoneNewItem";
import StoneNewItem from "../stones/StoneNewItem";
import LocusNewItem from "../loci/LocusNewItem";


export default {
  name: "jez-new", 
  components: { GroundstoneNewItem, LocusNewItem, StoneNewItem},
  computed: {
    newItem() {
      return this.$store.getters["mgr/moduleItemName"] + 'NewItem';
    },  
  },
};
</script>

