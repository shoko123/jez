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
          </v-btn>
        </template>
        <span>{{ resultsTipText }}</span>
      </v-tooltip>
      <div v-if="showCounter">
        <v-btn large outlined class="primary--text">{{ counterText }}</v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import FilterButton from "../filter/FilterButton";

export default {
  components: { FilterButton },
  computed: {
    homeText() {
      return `(${this.$store.getters["mgr/welcomeData"].counts.items})`;
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
    isFilterable() {
      return this.$store.getters["mgr/status"].isFilterable;
    },
    showCollectionLink() {
      return this.$store.getters["mgr/status"].isShow;
    },
    showCounter() {
      return this.$store.getters["mgr/status"].isShow;
    },
    counterText() {
      let ready = this.$store.getters["mgr/ready"];
      if (
        !this.showCounter ||
        !ready.item ||
        !ready.collection ||
        !ready.chunk
      ) {
        return "[...]";
      }
      let m = this.$store.getters["mgr/collections"]("main");
      let index = m.chunk.findIndex(
        (x) => x.id === this.$store.getters["mgr/item"].id
      );
      let cnt = m.chunkStartIndex + index + 1;
      let t = this.$store.getters["mgr/status"].count;
      return `[${cnt}/${t}]`;
    },
  },
  methods: {
    toWelcome() {
      this.$store.dispatch("mgr/goToRoute", "welcome");
    },

    toCollection() {

      this.$store.dispatch("mgr/goToRoute", {
        module: this.$store.getters["mgr/module"],
        action: "list",
        params: {seasons: [12,13,14], areas: ["S"]},
      });

      //this.$store.dispatch("mgr/goToRoute", "list");
    },
  },
};
</script>
<style scoped>
.min_width {
  min-width: 300px;
}
</style>