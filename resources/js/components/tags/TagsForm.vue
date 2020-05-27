<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-1">{{header}}</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="type in typesWithTags" :key="type.type">
          <v-list-item-content>
            <v-list-item-title>
              <v-container fluid class="pa-0 ma-0"><v-row wrap no-gutters>
              {{type.header}}:
              <v-chip v-for="tag in tagsForType(type)" :key="tag" class="ml-2 mb-1">{{tag}}</v-chip>
              </v-row></v-container>
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
  data() {
    return {};
  },
  created() {},
  computed: {
    header() {
      return `${this.$store.getters["mgr/moduleInfo"].itemName} tags (${this.noOfTags})`;
    },
    typesWithTags() {
      return this.$store.getters[`tag/typesWithTagsItemTagsActive`];
    },
    noOfTags() {
      return this.$store.getters[`tag/totalNoSelected`].itemTags;
    }
  },
  methods: {
    tagsForType(type) {
      return type.tags.map(x => x.name);
    },
  }
};
</script>
