<template>
<div>
  <component v-bind:is="picker"></component>
</div>
</template>

<script>

import findPicker from "../finds/findPicker";

export default {
  name: "picker", 
  components: {findPicker },
  computed: {
    picker() {      
      return findPicker;
    },   
  },
};
</script>