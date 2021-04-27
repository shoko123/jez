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
      this.$store.dispatch("mgr/clear");
      let qp = this.$store.getters["aux/getQueryString"];
      this.$store.dispatch("mgr/goToRoute", {
        module: this.$store.getters["mgr/module"],
        action: "list",
        params: qp,
      });
      return;
      this.$store.dispatch("aux/queryCollection", {
        clear: false,
        spinner: true,
        gotoCollection: true,
      });
    },

    clear() {
      this.$store.dispatch("aux/clearFilters");
    },
  },
};
</script>