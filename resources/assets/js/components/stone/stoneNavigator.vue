<template>
  <v-layout fill-height>
    <v-btn flat @click="prev()">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <stonePicker/>
    <v-btn flat @click="next()">
      <v-icon>arrow_forward</v-icon>
    </v-btn>
  </v-layout>
</template>
 


<script>
import stonePicker from "./stonePicker";
export default {
  name: "stone-navigator",
   components: { stonePicker },


  created() {

  },

  data() {
    return {};
  },

  computed: {
    stone() {
      return this.$store.getters.stone;
    },
    stones() {
      return this.$store.getters.stones;
    }
  },
  methods: {
    next() { 
      this.$store.dispatch("stoneNext")
    },

    prev() {
      this.$store.dispatch("stonePrev");
    }
  }
};
</script>

<style scoped>
</style>