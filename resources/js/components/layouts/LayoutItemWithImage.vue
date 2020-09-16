<template>
  <v-container fluid class="ma-0 pa-0">
    <v-card class="elevation-12">
      <v-card-title class="grey py-0">{{header}}</v-card-title>
        <template v-if="includeImage">
          <v-row wrap align="center" justify="center" no-gutters>
            <v-col lg="10">
              <slot name="e1"></slot>
            </v-col>
            <v-col lg="2">
              <div class="pr-2">
                <template v-if="mediaReady">
                  <MediaItem v-bind="{ mediaItem: mediaItem , source: source, index: 0  }"></MediaItem>
                </template>
              </div>
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <slot name="e1"></slot>
        </template>
      <v-card-text></v-card-text>
    </v-card>
  </v-container>
</template>

  

<script>
//{{header}}
import MediaItem from "../media/MediaItem";

export default {
  components: {
    MediaItem,
  },
  props: {
    options: Object,
    header: String
  },
  created() {
    console.log("LayoutItemWithImage options: " + JSON.stringify(this.options, null, 2) + "\nheader: " + this.header);
    //console.log("header: " + this.options.header);
  },
  computed: {
    

    ready() {
      return !this.$store.getters["mgr/xhrStatus"].loadingItem;
    },
    mediaArray() {
      return this.$store.getters["med/itemAllMedia"];
    },

    hasMedia() {
      return this.mediaArray ? this.mediaArray.length : false;
    },
    mediaReady() {
      return this.ready && this.hasMedia;
    },
     includeImage() {
      return this.options.showImage;
    },
    source() {
      return "ItemMedia";
    },

    mediaItem() {
      return this.$store.getters["med/itemOneMedia"];
    },
  },
};
</script>