<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-4">{{title}}</v-card-title>
    <v-card-text>
      <template v-if="hasMedia">
        <MediaItem v-bind="{ mediaItem: mediaItem , source: source, index: 0  }"></MediaItem>
      </template>
    </v-card-text>
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
    hasMedia() {
      return this.mediaArray ? this.mediaArray.length : false;
    },

    mediaArray() {
      return this.$store.getters["med/itemAllMedia"];
    },

    mediaItem() {
      return this.$store.getters["med/itemOneMedia"];
    },
    title() {
      return `Media (${this.mediaArray ? this.mediaArray.length : "..."})`;
    },
  },
};
</script>

