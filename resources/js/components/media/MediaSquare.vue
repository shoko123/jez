<template>
  <div v-if="item">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card class="mx-auto" max-width="size" max-height="size">
          <template v-if="header">
             <v-card-title class="grey py-0">{{header}}</v-card-title>
          </template>
          <v-img
            :src="item.tnUrl"
            contain
            aspect-ratio="1"
            class="grey lighten-2"
          >
          </v-img>        
            <v-fade-transition>
              <v-overlay v-if="hover" absolute color="#036358">
                <component
                  v-bind:is="overlay"
                  v-bind:media="item"
                  v-bind:source="source"
                  v-bind:index="index"
                ></component>
              </v-overlay>
            </v-fade-transition>       
        </v-card>
      </template>
    </v-hover>
  </div>
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
    OverlayCollectionItem,
  },
  props: {
    source: String,
    index: Number,
    size: Number,
    square: Boolean,
    header: String
  },

  created() {
    console.log(
      `"MediaSquare.created() source: ${this.source} index: ${this.index}`
    );
  },
  computed: {
    //////

    mediaItems() {
      switch (this.source) {
        case "Collection":
          if (!this.$store.getters["mgr/collectionMedia"]) {
            return [];
          } else {
            return this.$store.getters["mgr/collectionMedia"];
          }

        case "ItemMedia":
          return this.$store.getters["med/itemAllMedia"];

        case "MediaEdit":
          return this.$store.getters["med/itemAllMedia"];

        case "LocusFinds":
          return this.$store.getters["med/locusFindsMedia"];
      }
    },

    item() {
      return this.mediaItems ? this.mediaItems[this.index] : null;
    },

    /////
    srcThumbnail() {
      return this.item.tnUrl;
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
    },
  },
};
</script>

