<template>
  <v-toolbar dense>
    <v-toolbar-title class="primary--text">{{ subMenuTitle }}</v-toolbar-title>
    <v-btn @click="submit" color="primary" large rounded class="ml-2"
      >Submit</v-btn
    >
    <v-btn @click="clear" color="primary" large rounded outlined class="ml-2"
      >clear</v-btn
    >
  </v-toolbar>
</template>

<script>
import { filtersToQueryString } from "../../routing/queryString.js"
export default {
  data() {
    return {};
  },
  computed: {
    subMenuTitle() {
      return `${this.$store.getters["mgr/module"]} Filter Manager`;
    },
  },
  methods: {
    submit() {
      //this.$store.dispatch("mgr/clearModule");
      let qp = filtersToQueryString(this.$store.getters["aux/selectedFilters"]);
      this.$store.dispatch("mgr/goToRoute", {
        module: this.$store.getters["mgr/module"],
        action: "list",
        params: qp,
      });
      return;
    },

    clear() {
      this.$store.dispatch("aux/clearFilters");
    },
  },
};
</script>