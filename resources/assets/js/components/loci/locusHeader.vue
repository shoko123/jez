<template>
  <v-container fluid class="ma-0 pa-0">
 
  </v-container>
</template>

<script>
const LOCUS_HEADER_DISPLAY_STATE = Object.freeze({
  LOCUS_HEADER_LOCUS_WELCOME: Symbol("LOCUS_HEADER_LOCUS_WELCOME"),
  LOCUS_HEADER_LOCUS_LIST: Symbol("LOCUS_HEADER_LOCUS_LIST"),
  LOCUS_HEADER_LOCUS_LIST_FILTERED: Symbol("LOCUS_HEADER_LOCUS_LIST_FILTERED"),
  LOCUS_HEADER_LOCUS_SHOW: Symbol("LOCUS_HEADER_LOCUS_SHOW"),
  LOCUS_HEADER_LOCUS_NEW: Symbol("LOCUS_HEADER_LOCUS_NEW"),
  LOCUS_HEADER_LOCUS_FILTERS: Symbol("LOCUS_HEADER_LOCUS_FILTERS"),
  LOCUS_HEADER_LOCUS_DISPLAY_OPTIONS: Symbol("LOCUS_HEADER_LOCUS_DISPLAY_OPTIONS")
});

//import locusPicker from "./locusPicker";
//import locusNavigator from "./locusNavigator";

export default {
  name: "locus-header",
  data() {
    return {
      state: LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_WELCOME,
    };
  },
  computed: {
    showNavigator() {
      return this.state === LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_SHOW;
    }
  },
  methods: {
    welcome() {
      console.log("toWelcome() invoked");
      this.$router.push({ path: `/loci/welcome` });
    },

    saveLocus() {
      console.log("savelocus()");
    },
    deleteLocus() {},
    newLocus() {},
    toWelcome() {},
    displayOptions() {}
  }
};
</script>

<style scoped>

</style>