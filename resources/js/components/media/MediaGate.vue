<template>
  <v-card class="elevation-12">
    <template v-if="ready">
      <v-card-title class="grey py-0 mb-4">{{title}}</v-card-title>
      <v-card-text>
      <MediaItem v-bind="{ mediaItem: mediaItem , source: source, index: 0  }"></MediaItem>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import MediaItem from "./MediaItem";

export default {
  components: {
    MediaItem,
  },
  
  computed: {
    source() {
      return "ItemMedia";
    },
    ready() {
      return this.$store.getters["mgr/item"];
    },

    mediaArray() {
      return this.$store.getters["med/itemAllMedia"];
    },

    mediaItem() {
      return this.$store.getters["med/itemOneMedia"];
    },
title() {
      return `Media (${this.mediaArray ? this.mediaArray.length : "Calculating"})`;
    }
    
  }
};
</script>

