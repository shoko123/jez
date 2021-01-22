<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-1">{{ header }}</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="group in groups" :key="group.id">
          <v-list-item-content>
            <v-list-item-title>
              <v-container fluid class="pa-0 ma-0">
                <v-row wrap no-gutters>
                  <div class="font-weight-bold">{{ group.display_name }}:</div>
                  <v-chip
                    v-for="param in group.params"
                    :key="param.id"
                    class="pa-2 ml-2 mb-1"
                    >{{ param.name }}</v-chip
                  >
                </v-row>
              </v-container>
            </v-list-item-title>
            <v-row></v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    source: String,
  },
  computed: {
    groups() {
      switch (this.source) {
        case "itemParams":
          return this.$store.getters[`aux/selectedItemParams`];
        case "filters":
          return this.$store.getters[`aux/selectedFilters`];
        case "newParams":
          return this.$store.getters[`aux/selectedNewParams`];
        default:
          console.log(
            `******Wrong source argument (${this.source})for groups()`
          );
      }
    },

    noSelected() {
      return this.$store.getters["aux/totalNoSelected"];
    },

    header() {
      switch (this.source) {
        case "itemParams":
          return `${this.$store.getters["mgr/appStatus"].module} Tags (${this.groups.length})`;
        case "filters":
          return `${this.$store.getters["mgr/appStatus"].module} Active Filters (${this.groups.length})`;
        case "newParams":
          return `Selected Tags (${this.noSelected.itemTags})`;
        default:
          console.log(
            `******Wrong source argument (${this.source})for groups()`
          );
      }
    },
  },
};
</script>
