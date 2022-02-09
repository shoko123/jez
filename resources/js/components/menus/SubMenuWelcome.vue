<template>
  <v-toolbar dense>
    <v-container fluid class="ma-0 pa-0">
      <v-row>
        <v-btn
          class="primary--text"
          large
          outlined
          v-for="(btn, index) in buttons"
          :key="index"
          @click="callMethod(btn.method)"
          >{{ btn.text }}</v-btn
        >
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    buttons() {
      let btns = [];
      if (this.$store.getters["mgr/status"].isFilterable) {
        btns.push({ text: "Query Collection", method: "goToQuery" });
      }
      btns.push({ text: "Show All", method: "showAll" });
      btns.push({ text: "Lookup", method: "goToItem" });

      return btns;
    },
  },
  methods: {
    callMethod(name) {
      this[name]();
    },
    goToQuery() {
      this.$store.dispatch("aux/clearFilters");
      this.$store.dispatch("mgr/goToRoute", "filter");
    },

    showAll() {
      this.$store.dispatch("aux/clearFilters");
      this.$store.dispatch("mgr/goToRoute", {
        module: this.$store.getters["mgr/module"],
        action: "list",
        params: {},
      });
      return;
    },

    goToItem() {
      this.$store.dispatch("aux/clearFilters");
      this.$store.dispatch("mgr/goToRoute", {
        module: this.$store.getters["mgr/module"],
        action: "show",
        dot: this.$store.getters["mgr/welcomeData"].firstDot
      });
    },

    goToAreas() {
      console.log("goToAreas");
      this.$store.dispatch("mgr/goToRoute", {
        module: "Area",
        action: "welcome",
      });
    },
    goToSeasons() {
      console.log("goToSeasons");
      this.$store.dispatch("mgr/goToRoute", {
        module: "Season",
        action: "welcome",
      });
    },
  },
};
</script>