<template>
  <v-card class="elevation-12">
    <template v-if="ready">
      <v-card-title class="grey py-0 mb-4">{{fullTitle}}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="(item, index) in items" :key="item.id" cols="2">
            <MediaItem v-bind="{ media: item , arr: items, source: source, index: index  }"></MediaItem>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
import MediaItem from "./MediaItem";

export default {
  components: {
    MediaItem
  },

  props: {
    title: String,
    source: String
  },

  created() {
    console.log(
      `MediaGallery.created() title: ${this.title} source: ${this.source}`
    );
  },

  computed: {
    ready() {
      return this.source == "Collection"
        ? this.$store.getters["mgr/collection"]
        : this.$store.getters["mgr/item"];
    },

    items() {
      switch (this.source) {
        case "Collection":
          return this.$store.getters["mgr/collection"] &&
            this.$store.getters["mgr/collection"].length > 50
            ? this.$store.getters["mgr/collection"].slice(0, 50)
            : this.$store.getters["mgr/collection"];

        case "ItemMedia":
          return this.$store.getters["med/images"];

        case "MediaEdit":
          return this.$store.getters["med/images"];

        case "LocusFinds":
          return this.$store.getters["locusFinds/locusFinds"];
      }
    },

    fullTitle() {
      switch (this.source) {
        case "MediaEdit":
          return this.title;
        default:
          return this.items
            ? `${this.title} (${this.items.length})`
            : `${this.title} (Calculating...)`;
      }
    }
  }
};
</script>

