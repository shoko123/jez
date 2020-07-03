<template>
  <MediaGallery v-bind="props">
  </MediaGallery>
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
        title: "Small finds from locus",
        source: "LocusFinds",
      }
    }
  }
};
</script>



