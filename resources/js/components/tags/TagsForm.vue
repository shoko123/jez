<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-1">{{ header }}</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="type in typesAndParams" :key="type.id">
          <v-list-item-content>
            <v-list-item-title>
              <v-container fluid class="pa-0 ma-0">
                <v-row wrap no-gutters>
                  <div class="font-weight-bold">{{ type.display_name }}:</div>
                  <v-chip
                    v-for="param in type.params"
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
    typesAndParams() {
      switch (this.source) {
        case "itemParams":
          return this.$store.getters[`aux/itemSelected`];
        case "filters":
          return this.$store.getters[`aux/filtersSelected`];
        case "newParams":
          return this.$store.getters[`aux/newItemSelected`];
        default:
          console.log(
            `******Wrong source argument (${this.source})for typesAndParams()`
          );
      }
    },

    noSelected() {
      return this.$store.getters["aux/totalNoSelected"];
    },

    header() {
      switch (this.source) {
        case "itemParams":
          return `${this.$store.getters["mgr/appStatus"].module} Tags (${this.noSelected.itemTags})`;
        case "filters":
          return `${this.$store.getters["mgr/appStatus"].module} Active Filters (${this.noSelected.filters})`;
        case "newParams":
          return `Selected Tags (${this.noSelected.itemTags})`;
        default:
          console.log(
            `******Wrong source argument (${this.source})for typesAndParams()`
          );
      }
    },
  },
};
</script>
