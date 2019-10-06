<template>
<div>
  <component v-bind:is="showItem"></component>
</div>
</template>

<script>
import StoneShowItem from "../stones/StoneShowItem";
import LocusShowItem from "../loci/LocusShowItem";
export default {
  name: "show-item", 
  components: { LocusShowItem, StoneShowItem, },
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

