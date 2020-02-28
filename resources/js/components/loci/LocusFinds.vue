<template>
  <MediaGalleryNew v-bind="props">
  </MediaGalleryNew>
</template>

<script>
import MediaGalleryNew from "../media/MediaGalleryNew";
export default {
  components: {
    MediaGalleryNew
  },

  computed: {
    finds() {
      return this.$store.getters["locusFinds/locusFinds"];
    },
    props() {
      return {
        title: "Small finds from locus",
        source: "LocusFinds",
      }
    }
  }
};
</script>



