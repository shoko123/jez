<template>
<div>
  <component v-bind:is="showItem"></component>
</div>
</template>

<script>
import GroundstoneShowItem from "../gs/GroundstoneShowItem";
import LocusShowItem from "../loci/LocusShowItem";
export default {
  name: "show-item", 
  components: { GroundstoneShowItem, LocusShowItem },
data() {
    return {};
  },
  computed: {
    showItem() {
      return this.$store.getters["mgr/moduleItemName"] + 'ShowItem';
    },
   
  },
  methods: {
   
  }
};

</script>

