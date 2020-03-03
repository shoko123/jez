<template>
  <v-container fluid>
    <MediaGalleryNew v-bind="props"></MediaGalleryNew>
  </v-container>
</template> 

<script>
import MediaGalleryNew from "../media/MediaGalleryNew";

export default {
  components: {
    MediaGalleryNew
  },
  computed: {
    props() {
      return {
        title: "Locus Media Gallery",
        source: "ItemMedia"
      };
    }
  }
};
</script>
