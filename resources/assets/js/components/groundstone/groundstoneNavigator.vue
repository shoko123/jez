<template>
  <v-layout fill-height>
    <v-btn flat @click="prev()">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <picker/>
    <v-btn flat @click="next()">
      <v-icon>arrow_forward</v-icon>
    </v-btn>
  </v-layout>
</template>
 


<script>
//import groundstonePicker from "./groundstonePicker";
import picker from "../layouts/picker";
export default {
  name: "groundstone-navigator",
  components: { picker},

  created() {},

  data() {
    return {};
  },

  computed: {
    nextId() {
      return this.$store.getters.findNextId;
    },
    prevId() {
      return this.$store.getters.findPrevId;
    },
  },
  methods: {
    next() {
      //console.log("nav.next id: " + this.nextId);
      this.$router.push({ path: `/groundstones/${this.nextId}` });
    },

    prev() {
      //console.log("nav.prev id: " + this.prevId);
      this.$router.push({ path: `/groundstones/${this.prevId}` });
    },
  }
};
</script>

<style scoped>
</style>