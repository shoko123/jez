<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn @click="toWelcome" class="primary--text" outlined text>{{moduleText}}</v-btn>

        <!--v-btn @click="toFilter" class="primary--text" outlined text>{{filtersText}}</v-btn-->

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn @click="toFilter()" class="primary--text" v-on="on" >{{filtersText}}</v-btn>
          </template>
          <span>
            <FilterShow />
          </span>
        </v-tooltip>

        <v-btn class="primary--text" outlined text>{{collectionText}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>
import FilterShow from "../filter/FilterShow";

export default {
  components: { FilterShow },
  computed: {
    moduleText() {
      return `${this.$store.getters["mgr/status"].collectionName} (${this.$store.getters["mgr/moduleDetails"].itemCount})`;
    },
    filtersText() {
      return `>Filters(${this.$store.getters["aux/totalNoSelected"].filters})`;
    },
    collectionText() {
      return `>Results(${this.$store.getters["mgr/status"].count})`;
    },
  },
  methods: {
    toFilter() {
      this.$router.push({
        path: `${this.$router.currentRoute.path.replace("list", "filter")}`,
      });
    },
    toWelcome() {
      this.$router.push({
        path: `${this.$router.currentRoute.path.replace("list", "welcome")}`,
      });
    },
  },
};
</script>