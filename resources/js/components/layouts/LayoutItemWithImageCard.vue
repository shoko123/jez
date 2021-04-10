<template>
  <v-row wrap align="start" justify="center" no-gutters>
    <v-col lg="9">
      <slot name="e1"></slot>
    </v-col>
    <v-col lg="3" class="px-1">
      <MediaSquare
        v-bind='{
          source: "media",
          caller: "mediaPrimary",
          page: 1,
          index: 0,
          item: mediaItem,
          size: 400,
          header: mediaHeader,
        }'
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
    mediaArray() {
      return this.$store.getters["mgr/collections"]("media");
    },

    mediaItem() {
      return this.$store.getters["med/itemOneMedia"];
    },
    mediaHeader() {
      let cnt = this.mediaArray.length;
      return cnt > 0 ? `Media(${cnt})` : ``;
    },
    srcFull() {
      return this.mediaItem ? this.mediaItem.fullUrl : null;
    },
    hasMedia() {
      return this.mediaItem ? this.mediaItem.hasMedia : false;
    },
  },
};
</script>