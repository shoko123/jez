<template>
  <v-container fluid>
    <MediaGallery v-bind="props"></MediaGallery>
  </v-container>
</template>

<script>
import MediaGallery from "../media/MediaGallery";

export default {
  components: { MediaGallery },
  computed: {
    props() {
      return {
        title: "Glass Media Gallery",
        source: "ItemMedia",
      };
    },
  },
};
</script>
