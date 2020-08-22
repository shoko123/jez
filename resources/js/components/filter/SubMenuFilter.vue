<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn class="primary--text" text>{{subMenuTitle}}</v-btn>
        <v-row align="center" justify="center">
          <v-btn @click="submit" color="primary" large rounded class="ml-2">Submit</v-btn>
          <v-btn @click="clear" color="primary" large rounded outlined class="ml-2">clear</v-btn>
        </v-row>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    subMenuTitle() {
      return `${this.$store.getters["mgr/moduleInfo"].collectionName} Filters Manager`;
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("aux/queryCollection", {queryType: "current", spinner: true, gotoCollection: true});
    },

    clear() {
      this.$store.commit("aux/clearFilters");
    }
  }
};
</script>