<template>
  <v-layout fill-height>
    <v-btn flat @click="prev()">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <groundstonePicker/>
    <v-btn flat @click="next()">
      <v-icon>arrow_forward</v-icon>
    </v-btn>
  </v-layout>
</template>
 


<script>
import groundstonePicker from "./groundstonePicker";
export default {
  name: "groundstone-navigator",
   components: { groundstonePicker },


  created() {

  },

  data() {
    return {};
  },

  computed: {
    groundstone() {
      return this.$store.getters.groundstone;
    },
    groundstones() {
      return this.$store.getters.groundstones;
    }
  },
  methods: {
    next() { 
      this.$store.dispatch("groundstoneNext")
    },

    prev() {
      this.$store.dispatch("groundstonePrev");
    }
  }
};
</script>

<style scoped>
</style>