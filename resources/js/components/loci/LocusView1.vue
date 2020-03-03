<template>
  <v-container fluid>
    <MediaGallery v-bind="props"></MediaGallery>
  </v-container>
</template> 

<script>
import MediaGallery from "../media/MediaGallery";

export default {
  components: {
    MediaGallery
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
