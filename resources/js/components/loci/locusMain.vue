<template>
  <v-container fluid class="ma-0 pa-0">
    <router-view></router-view>
  </v-container>
</template>

<script>
//random freeze example.
const LOCUS_HEADER_DISPLAY_STATE = Object.freeze({
  LOCUS_HEADER_LOCUS_WELCOME: Symbol("LOCUS_HEADER_LOCUS_WELCOME"),
  LOCUS_HEADER_LOCUS_LIST: Symbol("LOCUS_HEADER_LOCUS_LIST"),
  LOCUS_HEADER_LOCUS_LIST_FILTERED: Symbol("LOCUS_HEADER_LOCUS_LIST_FILTERED"),
  LOCUS_HEADER_LOCUS_SHOW: Symbol("LOCUS_HEADER_LOCUS_SHOW"),
  LOCUS_HEADER_LOCUS_NEW: Symbol("LOCUS_HEADER_LOCUS_NEW"),
  LOCUS_HEADER_LOCUS_FILTERS: Symbol("LOCUS_HEADER_LOCUS_FILTERS"),
  LOCUS_HEADER_LOCUS_DISPLAY_OPTIONS: Symbol("LOCUS_HEADER_LOCUS_DISPLAY_OPTIONS")
});

export default {
  name: "locus-main",

  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {}
};
</script>

<style scoped>
</style>