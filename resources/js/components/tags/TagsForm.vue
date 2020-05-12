<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-1">{{header}}</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="type in tagsByType" :key="type.type">
          <v-list-item-content>
            <v-list-item-title>
              {{type.type}}:
              <v-chip v-for="tag in tagsForType(type)" :key="tag" class="ml-3">{{tag}}</v-chip>
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
    tagsByType() {
      return this.$store.getters[`tag/activeItemTagsByType`];
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
