
<template>
    <component v-bind:is="gallery"></component>
</template>

<script>
import MediaGalleryEdit from "./MediaGalleryEdit";
import MediaGalleryRO from "./MediaGalleryRO";
export default {
  components: {
    MediaGalleryEdit,
    MediaGalleryRO
  },

  computed: {
    gallery() {
      return this.$store.getters["mgr/status"].isMediaEdit
        ? MediaGalleryEdit
        : MediaGalleryRO;
    }
  }
};
</script>