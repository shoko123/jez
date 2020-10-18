<template>
  <div v-if="item">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card class="mx-auto" max-width="size" max-height="size">
          <v-img
            :src="size > 250 ? item.fullUrl : item.tnUrl"
            :lazy-src="size > 250 ? item.tnUrl : null"
            contain
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <v-btn
              class="text-subtitle-1 font-weight-medium black--text"
              color="grey"
              >{{ header ? header : item.tag }}</v-btn            >
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
import OverlayAreaSeasonLoci from "./OverlayAreaSeasonLoci";
import OverlayLocusFinds from "./OverlayLocusFinds";
import OverlayItemMedia from "./OverlayItemMedia";
import OverlayMediaEdit from "./OverlayMediaEdit";
import OverlayCollectionItem from "./OverlayCollectionItem";

export default {
  components: {
    OverlayAreaSeasonLoci,
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
    header: String,
  },

  created() {
    //console.log(
    //  `MediaSquare.created() source: ${this.source} index: ${this.index}`
    //);
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
          return this.$store.getters["loci/locusFinds"];

        case "AreaSeasonLoci":
          return this.$store.getters["areaSeason/loci"];
        default:
          console.log(
            `******Wrong source argument (${this.source})for MediaSquare`
          );
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
        case "AreaSeaesonLoci":
          return OverlayAreaSeasonLoci;
        case "LocusFinds":
          return OverlayLocusFinds;
        case "ItemMedia":
          return OverlayItemMedia;
        case "MediaEdit":
          return OverlayMediaEdit;
        case "Collection":
          return OverlayCollectionItem;
        default:
          console.log(
            `******Wrong source argument (${this.source})for MediaSquare`
          );
      }
    },
  },
};
</script>
<style scoped>


</style>

