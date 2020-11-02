<template>
  <v-container class="ma-0 pa-0 primary--text min_width">
    <v-row>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            @click="toWelcome()"
            large
            outlined
            v-on="on"
            class="primary--text"
          >
            <v-icon left class="primary--text">home</v-icon>
            {{ homeText }}
          </v-btn>
        </template>
        <span>{{ homeTipText }}</span>
      </v-tooltip>

      <FilterButton v-if="isFilterable" />

      <v-tooltip v-if="showCollectionLink" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            @click="toCollection()"
            large
            outlined
            v-on="on"
            class="primary--text"
          >
            <v-icon left class="primary--text">menu</v-icon>
            {{ resultsText }}
          </v-btn>
        </template>
        <span>{{ resultsTipText }}</span>
      </v-tooltip>

      <v-tooltip v-if="!isFilterable" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            @click="toAreaSeason()"
            large
            outlined
            v-on="on"
            class="primary--text"
          >
            <v-icon left dark>view_comfy</v-icon>
          </v-btn>
        </template>
        <span>{{ areaSeasonTipText }}</span>
      </v-tooltip>
    </v-row>
  </v-container>
</template>

<script>
import FilterButton from "../filter/FilterButton";

export default {
  components: { FilterButton },
  computed: {
    homeText() {
      return `(${this.$store.getters["mgr/moduleData"].counts.items})`;
    },
    homeTipText() {
      return `To ${this.$store.getters["mgr/module"]} Home Page`;
    },
    resultsText() {
      return `(${this.$store.getters["mgr/status"].count})`;
    },
    resultsTipText() {
      return `To ${this.$store.getters["mgr/status"].collectionName} Result Collection`;
    },
    areaSeasonTipText() {
      return `To Area/Season Collection`;
    },
    isFilterable() {
      return this.$store.getters["mgr/status"].isFilterable;
    },
    showCollectionLink() {
      return this.$store.getters["mgr/status"].isShow;
    },
  },
  methods: {
    toWelcome() {
      this.$router.push({
        path: `${this.$store.getters["mgr/moduleInfo"].appBaseUrl}/welcome`,
      });
    },

    toCollection() {
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
<style scoped>
.min_width {
   min-width: 300px;
}
</style>