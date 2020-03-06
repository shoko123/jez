<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="mx-auto" max-width="350" max-height="350">
        <v-img :src="srcThumbnail" contain aspect-ratio="1" class="grey lighten-2" max-width="350"></v-img>
        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#036358">
            <component v-bind:is="overlay" v-bind:media="mediaItem" v-bind:source="source"></component>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>
    

<script>
import OverlayLocusFinds from "./OverlayLocusFinds";
import OverlayItemMedia from "./OverlayItemMedia";
import OverlayMediaEdit from "./OverlayMediaEdit";
import OverlayCollectionItem from "./OverlayCollectionItem";

export default {
  components: {
    OverlayLocusFinds,
    OverlayItemMedia,
    OverlayMediaEdit,
    OverlayCollectionItem
  },
  props: {
    mediaItem: Object,
    source: String,
    index: Number
  },
  created() {
    //console.log("MediaItem.created() item: " + JSON.stringify(this.mediaItem, null, 2)+ " source: " + this.source);
  },

  computed: {
    srcThumbnail() {
      if (!this.mediaItem) {
        return this.$store.getters["med/srcThumbnailFiller"];
      }
      return "srcThumbnail" in this.mediaItem
        ? this.mediaItem.srcThumbnail
        : this.$store.getters["med/srcThumbnailFiller"];
    },
    overlay() {
      switch (this.source) {
        case "LocusFinds":
          return OverlayLocusFinds;
        case "ItemMedia":
          return OverlayItemMedia;
        case "MediaEdit":
          return OverlayMediaEdit;
        case "Collection":
          return OverlayCollectionItem;
      }
    }
  },
  methods: {}
};
</script>

