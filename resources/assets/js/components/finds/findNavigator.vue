<template>
  <v-layout fill-height>
    <v-btn flat @click="prev()">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <findPicker/>
    <v-btn flat @click="next()">
      <v-icon>arrow_forward</v-icon>
    </v-btn>
  </v-layout>
</template>
 


<script>
import findPicker from "./findPicker";
export default {
  name: "find-navigator",
   components: { findPicker },


  created() {

  },

  data() {
    return {};
  },

  computed: {
    find() {
      return this.$store.getters.find;
    },
    finds() {
      return this.$store.getters.finds;
    }
  },
  methods: {
    next() { 
      this.$store.dispatch("findNext")
    },

    prev() {
      this.$store.dispatch("findPrev");
    }
  }
};
</script>

<style scoped>
</style>