<template>
  <v-row wrap align="start" justify="center" no-gutters>
    <v-col lg="9">
      <slot name="e1"></slot>
    </v-col>
    <v-col lg="3" class="px-1">
      <MediaSquare
        v-bind="{
          source: 'ItemMedia',
          index: 0,
          size: 400,
          header: mediaHeader,
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
    mediaArray() {
      return this.$store.getters["med/itemAllMedia"];
    },

    mediaItem() {
      return this.$store.getters["med/itemOneMedia"];
    },
    mediaHeader() {
      let cnt = this.$store.getters["med/itemAllMedia"].length;
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