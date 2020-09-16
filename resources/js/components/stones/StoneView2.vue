
<template>
  <v-container fluid>
    <MediaGallery v-bind="props"></MediaGallery>
  </v-container>
</template>

<script>
import MediaGallery from "../media/MediaGallery";

export default {
  components: { MediaGallery },
  data() {
    return {};
  },
  computed: {
    props() {
      return {
        title: "Stone Media Gallery",
        source: "ItemMedia",
      };
    },
  },
  methods: {},
};
</script>
