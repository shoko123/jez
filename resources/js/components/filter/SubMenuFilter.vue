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
import { filtersToQueryParams } from "../../routing/queryString.js"
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
      let filters = this.$store.getters["aux/selectedFilters"];
      let qp = filtersToQueryParams(filters);
      //console.log(`filter.submit() selectedFilters: ${JSON.stringify(filters, null, 2)}`);
      this.$store.dispatch("mgr/goToRoute", {
        module: this.$store.getters["mgr/module"],
        action: "list",
        params: qp,
      });
    },

    clear() {
      this.$store.dispatch("aux/clearFilters");
    },
  },
};
</script>