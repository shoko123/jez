<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar dense>
      <v-toolbar-items>
        <v-btn @click="toWelcome" class="primary--text" outlined text>{{
          moduleText
        }}</v-btn>

        <template v-if="showFilters">
          <FilterButton />
          <v-btn class="primary--text" outlined text>{{
            collectionText
          }}</v-btn>
        </template>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-btn @click="toggleDisplayOption" class="primary--text" outlined text>{{
        displayOption
      }}</v-btn>
    </v-toolbar>
  </v-container>
</template>

<script>
import FilterButton from "../filter/FilterButton";

export default {
  components: { FilterButton },
  computed: {
    moduleText() {
      return `${this.$store.getters["mgr/status"].collectionName} (${this.$store.getters["mgr/moduleDetails"].itemCount})`;
    },
    filtersText() {
      return `>Filters(${this.$store.getters["aux/totalNoSelected"].filters})`;
    },
    collectionText() {
      return `>Results(${this.$store.getters["mgr/status"].count})`;
    },
    displayOption() {
      return this.$store.getters["mgr/display"].asMedia
        ? "View: Gallery"
        : "View: Chips";
    },
    showFilters() {
      return (
        this.$store.getters["mgr/status"].isLocus ||
        this.$store.getters["mgr/status"].isFind
      );
    },
  },
  methods: {
    toFilter() {
      this.$router.push({
        path: `${this.$router.currentRoute.path.replace("list", "filter")}`,
      });
    },
    toWelcome() {
      this.$router.push({
        path: `${this.$router.currentRoute.path.replace("list", "welcome")}`,
      });
    },
    toggleDisplayOption() {
      this.$store.commit("mgr/displaySetCurrentPage", {
        source: "Collection",
        page: 1,
      });
      this.$store.commit("mgr/displayToggleCollectionView", null);
    },
  },
};
</script>