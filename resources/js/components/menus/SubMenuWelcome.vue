<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar dense>
      <v-toolbar-items>
        <v-btn
          class="primary--text"
          large
          outlined
          v-for="(btn, index) in buttons"
          :key="index"
          @click="callMethod(btn.method)"
          >{{ btn.text }}</v-btn
        >
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  computed: {
    buttons() {
      let btns = [];
      if (this.$store.getters["mgr/status"].isFilterable) {
        btns.push({ text: "Query Collection", method: "goToQuery" });
        btns.push({ text: "Show All", method: "showAll" });
        btns.push({ text: "Explore", method: "goToItem" });
      } else {
        btns.push({ text: "Areas", method: "goToAreas" });
        btns.push({ text: "Seasons", method: "goToSeasons" });
        btns.push({ text: "Areas/Seasons", method: "showAll" });
      }
      return btns;
    },
  },
  methods: {
    callMethod(name) {
      this[name]();
    },
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
            path: `${this.$store.getters["mgr/moduleInfo"].appBaseUrl}/${this.$store.getters["mgr/collection"][0].id}/show`,
          });
        });
    },

    goToAreas() {
      console.log("goToAreas");
    },
    goToSeasons() {
      console.log("goToSeasons");
    },
  },
};
</script>