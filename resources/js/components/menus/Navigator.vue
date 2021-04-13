<template>
  <v-container class="ma-0 pa-0 min_width">
    <v-row align="center">
      <v-btn fab text @click="goToItem('prev')" :disabled="disable">
        <v-icon color="primary">arrow_back</v-icon>
      </v-btn>

      <Picker />

      <v-btn fab text @click="goToItem('next')" :disabled="disable">
        <v-icon color="primary">arrow_forward</v-icon>
      </v-btn>
      <v-btn
        v-if="isAreaSeason"
        large
        @click="goToArea"
        color="info"
        text
        rounded
        outlined
        class="no-uppercase"
        :disabled="disable"
        >to Area</v-btn
      >
      <v-btn
        v-if="isAreaSeason"
        large
        @click="goToSeason"
        color="info"
        text
        rounded
        outlined
        class="no-uppercase"
        :disabled="disable"
        >to Season</v-btn
      >
      <v-btn
        v-if="isLocus"
        large
        @click="goToAreaSeason"
        color="info"
        text
        rounded
        outlined
        class="no-uppercase"
        :disabled="disable"
        >to Area/Season</v-btn
      >
      <v-btn
        v-if="isFind"
        large
        @click="goToLocus"
        color="info"
        text
        rounded
        outlined
        class="no-uppercase"
        :disabled="disable"
        >to Locus</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import Picker from "../registration/Picker";

export default {
  name: "navigator",
  components: { Picker },

  computed: {
    disable() {
      return (
        this.$store.getters["mgr/xhrStatus"].loadingItem ||
        this.$store.getters["mgr/xhrStatus"].loadingCollection
      );
    },
    adjacents() {
      return this.$store.getters["mgr/adjacents"];
    },
    isLocus() {
      return this.$store.getters["mgr/status"].isLocus;
    },
    isFind() {
      return this.$store.getters["mgr/status"].isFind;
    },
    isAreaSeason() {
      return this.$store.getters["mgr/module"] === "AreaSeason";
    },
    item() {
      return this.$store.getters["mgr/item"];
    },
  },
  methods: {
    goToItem(direction) {
      if (this.adjacents) {
        return this.$store.dispatch("mgr/goToRoute", direction);
      }
    },

    goToArea() {
      return this.$store.dispatch("mgr/goToRoute", {
        module: "Area",
        action: "show",
        id: this.$store.getters["mgr/item"].area_id,
      });
    },

    goToSeason() {
      return this.$store.dispatch("mgr/goToRoute", {
        module: "Season",
        action: "show",
        id: this.$store.getters["mgr/item"].season_id,
      });
    },

    goToAreaSeason() {
      return this.$store.dispatch("mgr/goToRoute", {
        module: "AreaSeason",
        action: "show",
        id: this.$store.getters["mgr/item"].area_season_id,
      });
    },

    goToLocus() {
      return this.$store.dispatch("mgr/goToRoute", {
        module: "Locus",
        action: "show",
        id: this.$store.getters["mgr/item"].locus_id,
      });
    },
  },
};
</script>

<style scoped>
.no-uppercase {
  text-transform: none;
}

.min_width {
  min-width: 500px;
}
</style>