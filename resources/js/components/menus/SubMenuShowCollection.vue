<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
       <v-btn class="primary--text" outlined text>{{moduleText}}</v-btn>
        <v-btn @click="toFilter" class="primary--text" outlined text>{{filtersText}}</v-btn>
        <v-btn class="primary--text" outlined text>{{collectionText}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>

export default {
  computed: {
    moduleText() {
      return `${this.$store.getters["mgr/status"].collectionName} (${this.$store.getters["mgr/moduleDetails"].itemCount})`;
    },
    filtersText() {
      return `>Filters(${this.$store.getters["tag/totalNoSelected"].filters})`;
    },
    collectionText() {
      return `>Results(${this.$store.getters["mgr/status"].count})`;
    },
  },
  methods: {
    toFilter() {
      this.$router.push({ path: `${this.$router.currentRoute.path.replace("list", "filter/select-filter")}` }); 
    }
  }
};
</script>