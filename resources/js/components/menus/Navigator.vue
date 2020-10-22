<template>
  <v-container class="ma-0 pa-0">
    <v-row align="center" justify="center">
      <v-btn fab text @click="goToItem('prev')" :disabled="disable">
        <v-icon color="primary">arrow_back</v-icon>
      </v-btn>

      <Picker />

      <v-btn fab text @click="goToItem('next')" :disabled="disable">
        <v-icon color="primary">arrow_forward</v-icon>
      </v-btn>
      <template v-if="isLocus">
        <v-btn
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
      </template>
      <template v-if="isFind">
        <v-btn
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
      </template>
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
  },
  methods: {
    goToItem(direction) {
      if (this.adjacents) {
        let path = this.$store.getters["mgr/status"].moduleAppBaseUrl;
        this.$router.push({
          path: `${path}/${
            direction == "next" ? this.adjacents.next : this.adjacents.prev
          }/show`,
        });
      }
    },

    goToAreaSeason() {
      if (this.$store.getters["mgr/item"]) {
        this.$router.push({
          path: `/dig-modules/areas-seasons/${this.$store.getters["mgr/item"].area_season_id}/show`,
        });
      }
    },
    goToLocus() {
      if (this.$store.getters["mgr/item"]) {
        this.$router.push({
          path: `/dig-modules/loci/${this.$store.getters["mgr/item"].locus_id}/show`,
        });
      }
    },
  },
};
</script>

<style scoped>
.no-uppercase {
  text-transform: none;
}
</style>