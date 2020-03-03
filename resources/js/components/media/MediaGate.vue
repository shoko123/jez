<template>
  <v-card class="elevation-12">
    <template v-if="ready">
      <MediaItem v-bind="{ image: image , arr: images, source: source, index: 0  }"></MediaItem>
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

    images() {
      return this.$store.getters["med/images"];
    },

    image() {
      return this.$store.getters["med/images"][0];
    },

    
  }
};
</script>

