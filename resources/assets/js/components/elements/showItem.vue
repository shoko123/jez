<template>
<div>
  <component v-bind:is="showItem"></component>
</div>
</template>

<script>
import gssShowItem from "../gs/gsShowItem";
export default {
  name: "show-item", 
  components: { gssShowItem },
data() {
    return {};
  },
  computed: {
    showItem() {
      return this.$store.getters["mgr/moduleName"] + 'ShowItem';
    },
   
  },
  methods: {
   
  }
};

</script>

