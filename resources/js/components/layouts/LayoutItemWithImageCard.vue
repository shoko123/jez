<template>
  <v-row wrap align="start" justify="center" no-gutters>
    <v-col lg="9">
      <slot name="e1"></slot>
    </v-col>
    <v-col lg="3" class="px-1">
      <MediaSquare
        v-bind="{
          source: 'media',
          caller: 'mediaPrimary',
          page: 1,
          index: 0,
          item: mediaItem,
          size: 400,
        }"
      ></MediaSquare>
    </v-col>
  </v-row>
</template>


<script>
import MediaSquare from "../media/MediaSquare";

export default {
  components: {
    MediaSquare,
  },

  created() {
    //console.log("LayoutItemWithImage.created() header: " + this.header);
  },
  computed: {
    //Assured to be called only if item has media associated with it (["mgr/collections"]("media").collection.lenght > 0)
    mediaItem() {
      return this.$store.getters["mgr/collections"]("media").collection[0];
    },

    hasMedia() {
      return this.$store.getters["mgr/item"].hasMedia;
    },
  },
};
</script>