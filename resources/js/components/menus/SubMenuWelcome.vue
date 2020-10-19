<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar dense>
      <v-toolbar-items>
        <v-btn @click="goToQuery">query collection</v-btn>
        <v-btn @click="showAll">show all</v-btn>
        <v-btn @click="goToItem">explore</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  computed: {},
  methods: {
    goToQuery() {
      this.$store.dispatch("aux/clearFilters");
      this.$router.push({
        path: `${this.$router.currentRoute.path.replace("welcome", "filter")}`,
      });
    },

    showAll() {
      this.$store.dispatch("aux/queryCollection", {
        clear: true,
        spinner: true,
        gotoCollection: true,
      });
    },

    goToItem() {
      this.$store
        .dispatch("aux/queryCollection", {
          clear: true,
          spinner: true,
          gotoCollection: false,
        })
        .then((res) => {
          this.$router.push({
            path: `${this.status.moduleAppBaseUrl}/${this.$store.getters["mgr/collection"][0].id}/show`,
          });
        });
    },
  },
};
</script>