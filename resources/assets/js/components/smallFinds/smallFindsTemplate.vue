
<template>
  <v-container fluid class="ma-0 pa-0">
    <component v-bind:is="currentFindCategoryMenu"></component>
    <component v-bind:is="currentFindCategoryBody"></component>
  </v-container>
</template>

<script>
import stoneHeader from "./stoneHeader";

export default {
  name: "stone-main",
  components: { stoneHeader },

  data() {
    return {
      drawer: null,
      on: true,
    };
  },
  props: {
    source: String
  },
  created() {
    console.log("stoneMain.created()");
    //if alredy hydrated - abort
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
</style>