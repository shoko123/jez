<template>
  <component v-bind:is="newItem"></component>
</template>

<script>
import GroundstoneNewItem from "../gs/GroundstoneNewItem";
export default {
  name: "jez-new", 
  components: { GroundstoneNewItem },
  computed: {
    newItem() {
      return this.$store.getters["mgr/moduleItemName"] + 'NewItem';
    },  
  },
};
</script>

