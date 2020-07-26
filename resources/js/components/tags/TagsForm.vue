<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-1">{{header}}</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="type in typesWithTags" :key="type.type">
          <v-list-item-content>
            <v-list-item-title>
              <v-container fluid class="pa-0 ma-0">
                <v-row wrap no-gutters>
                  <div class="font-weight-bold">{{type.header}}:</div>
                  <v-chip v-for="tag in tagsForType(type)" :key="tag" class="pa-2 ml-2 mb-1">{{tag}}</v-chip>
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
    isFilterNotNewItem: Boolean,
    source: String,
  },
  computed: {
    typesWithTags() {
      switch (this.source) {
        case "ItemTags":
          return this.$store.getters[`tag/typesWithTagsItemTagsActive`];

        case "Filters":
          return this.$store.getters[`tag/typesWithTagsFiltersActive`];

        case "NewTags":
          return this.$store.getters["tag/typesWithTagsNewItemActive"];
      }
      //return this.isFilterNotNewItem
      //  ? this.$store.getters[`tag/typesWithTagsFiltersActive`]
      // : this.$store.getters[`tag/typesWithTagsItemTagsActive`];
    },
    noOfTags() {
      switch (this.source) {
        case "ItemTags":
          return this.$store.getters[`tag/totalNoSelected`].itemTags;

        case "Filters":
          return this.$store.getters[`tag/totalNoSelected`].filters;

        case "NewTags":
          return this.$store.getters[`tag/totalNoSelected`].newTags;
      }

      //return this.isFilterNotNewItem
      //  ? this.$store.getters[`tag/totalNoSelected`].filters
      //  : this.$store.getters[`tag/totalNoSelected`].itemTags;
    },

    header() {
      switch (this.source) {
        case "ItemTags":
          return `${this.$store.getters["mgr/moduleInfo"].itemName} tags (${this.noOfTags})`;

        case "Filters":
          return `${this.$store.getters["mgr/moduleInfo"].collectionName} active filters (${this.noOfTags})`;

        case "NewTags":
          return `Selected tags (${this.noOfTags})`;
      }
      //return this.isFilterNotNewItem ? `${this.$store.getters["mgr/moduleInfo"].collectionName} active filters (${this.noOfTags})` : `${this.$store.getters["mgr/moduleInfo"].itemName} tags (${this.noOfTags})`;
    },
  },
  methods: {
    tagsForType(type) {
      return type.tags.map((x) => x.name);
    },
  },
};
</script>
