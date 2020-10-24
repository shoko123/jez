<template>
  <v-container class="ma-0 pa-0">
    <v-row>
      <v-btn @click="toWelcome" class="primary--text" large outlined>{{
        moduleText
      }}</v-btn>

     
        <FilterButton />

        <v-btn @click="toCollection" class="primary--text" large outlined>{{
          collectionText
        }}</v-btn>

       <template v-if="!isFilterable">
        <v-btn @click="toAreaSeason" class="primary--text" large outlined
          >Areas/Seasons</v-btn
        >
      </template>
    </v-row>
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
    collectionText() {
      return `>Results(${this.$store.getters["mgr/status"].count})`;
    },
    isFilterable() {
      return this.$store.getters["mgr/status"].isFilterable;
    },
  },
  methods: {
    toWelcome() {
      this.$router.push({
        path: `${this.$store.getters["mgr/moduleInfo"].appBaseUrl}/welcome`,
      });
    },

    toCollection() {
      if (this.$store.getters["mgr/status"].action === "list") {
        return;
      }
      this.$router.push({
        path: `${this.$store.getters["mgr/moduleInfo"].appBaseUrl}/list`,
      });
    },
    toAreaSeason() {
      this.$router.push({
        path: `${this.$store.getters["mgr/myModules"]["AreaSeason"].appBaseUrl}/list`,
      });
    },
  },
};
</script>