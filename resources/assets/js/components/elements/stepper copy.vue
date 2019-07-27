<template>
<div>
  <component v-bind:is="stepper"></component>
</div>
</template>

<script>
import gssStepper from "../gs/gsStepper";
export default {
  name: "stepper", 
  components: { gssStepper },
data() {
    return {};
  },
  computed: {
    stepper() {
      return this.$store.getters["mg/moduleName"] + 'Stepper';
    },
   
  },
  methods: {
   
  }
};

</script>

