
<template>
<v-container fluid>
 <MediaGalleryNew v-bind="props"></MediaGalleryNew>
 </v-container>
</template>

<script>

import MediaGalleryNew from "../media/MediaGalleryNew";

export default {
  components: { MediaGalleryNew },
  data() {
    return {};
  },
  computed: { 
      props() {
      return {
        title: "Stone Media Gallery",
        source: "ItemMedia"
      };
    }
  },
  methods: {}
};
</script>
