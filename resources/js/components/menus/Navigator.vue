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
      let ready = this.$store.getters["mgr/ready"];
      return (!ready.item || !ready.collection);
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
      //No checks needed - guaranteed collection loaded by :disable
      return this.$store.dispatch("mgr/goToRoute", direction);
    },

    goToArea() {
       let arr = this.$store.getters["mgr/item"].dot.split('.');
       let dot =arr[1];
      return this.$store.dispatch("mgr/goToRoute", {
        module: "Area",
        action: "show",
        dot,
      });
    },

    goToSeason() {
        let arr = this.$store.getters["mgr/item"].dot.split('.');
       let dot =arr[0];
      return this.$store.dispatch("mgr/goToRoute", {
        module: "Season",
        action: "show",
        dot,
      });
    },

    goToAreaSeason() {
       let arr = this.$store.getters["mgr/item"].dot.split('.');
      let areaDot = arr[0] + '.' + arr[1];
      return this.$store.dispatch("mgr/goToRoute", {
        module: "AreaSeason",
        action: "show",
        dot: areaDot,
      });
    },

    goToLocus() {
      let arr = this.$store.getters["mgr/item"].dot.split('.');
      let locusDot = arr[0] + '.' + arr[1] + '.' + arr[2];
      return this.$store.dispatch("mgr/goToRoute", {
        module: "Locus",
        action: "show",
        dot: locusDot,
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