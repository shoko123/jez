<template>
  <v-card class="elevation-12">
    <template v-if="ready">
      <v-card-title class="grey py-0 mb-4">{{title}}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="(item, index) in items" :key="item.id" cols="2">
              <MediaItemNew v-bind="{ image: item , arr: items, source: source, index: index  }"></MediaItemNew>
          </v-col>
        </v-row>
      </v-card-text>
    </template>
  </v-card>
</template>


<script>
import MediaItemNew from "./MediaItemNew";

export default {
  components: {
    MediaItemNew
  },

  props: {
    title: String,
    source: String
  },

  created() {
    console.log("mediaGalleryNew.created() title: " + this.title);
  },

  computed: {
    ready() {
      return this.$store.getters["mgr/item"];
    },

    items() {
      switch (this.source) {
        case "Collection":
        case "Item":
          return null;
        case "LocusFinds":
          return this.$store.getters["locusFinds/locusFinds"];
      }
    },
  }
};
</script>

