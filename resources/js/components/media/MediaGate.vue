<template>
  <v-card class="elevation-12">
    <template v-if="ready">
      <v-card-title class="grey py-0 mb-4">{{title}}</v-card-title>
      <v-card-text>
        <MediaItem v-bind="{ image: image , arr: images, source: source, index: 0  }"></MediaItem>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import MediaItem from "./MediaItem";

export default {
  components: {
    MediaItem
  },

  computed: {
    source() {
      return "ItemMedia";
    },
    ready() {
      return this.$store.getters["mgr/item"];
    },

    images() {
      return this.$store.getters["med/images"];
    },

    image() {
      return this.$store.getters["med/images"][0];
    },
    title() {
      return `Media (${this.images ? this.images.length : "Calculating"})`;
    }
  }
};
</script>

