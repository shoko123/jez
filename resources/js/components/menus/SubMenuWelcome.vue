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

       this.$store.dispatch("mgr/goToRoute", {
        module: this.$store.getters["mgr/module"],
        action: "list",
        params: JSON.stringify({seasons: [12,13,14], areas: ["S"]}),
      });
      return;
    },

    goToItem() {
      this.$store
        .dispatch("aux/queryCollection", {
          clear: true,
          spinner: true,
          gotoCollection: false,
        })
        .then((res) => {
          this.$store.dispatch("mgr/goToRoute", {
            module: this.$store.getters["mgr/module"],
            action: "show",
            id: this.$store.getters["mgr/collections"]("main").collection[0].id,
          });
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