<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn flat>Loci</v-btn>

        <v-divider class="mx-3" inset vertical></v-divider>

        <template v-if="showNavigator">
          <locusNavigator/>

          <v-divider class="mx-3" inset vertical></v-divider>

          <v-btn>
            <v-icon @click="saveLocus()" color="info">save</v-icon>
          </v-btn>
          <v-btn>
            <v-icon @click="deleteLocus()" color="error">delete</v-icon>
          </v-btn>
          <v-btn>
            <v-icon @click="newLocus()" color="warning">note_add</v-icon>
          </v-btn>
        </template>

      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="welcome" color="info" flat>welcome</v-btn>
        <v-btn @click="displayOptions()" color="info" flat>display options</v-btn>
      </v-toolbar-items>
    </v-toolbar>
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

import locusPicker from "./locusPicker";
import locusNavigator from "./locusNavigator";

export default {
  name: "locus-header",
  components: { locusPicker, locusNavigator },
  
  watch: {
    $route(to, from) {
      /*
      switch (to.name) {
        case "locusWelcome":
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_WELCOME;
          break;

        case "locusShow":
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_SHOW;
          break;

        case "locusNew":
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_NEW;
          break;

        case "locusFilters":
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_FILTERS;
          break;

        case "locusDisplayOptions":
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_DISPLAY_OPTIONS;
          break;

        case "locusList":
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_LIST;
          break;

        case "locusFilteredList":
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_LIST_FILTERED;

          break;

        default:
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_WELCOME;
      }
      */
      //console.log(
      //  "locusHeader.watch($route) route changed to: " + to.path + " name: " + to.name
      //);
    }
    
  },
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
.my {
  background: rgb(156, 8, 8);
}
</style>