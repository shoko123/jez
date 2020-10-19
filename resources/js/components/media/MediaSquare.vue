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
              v-if="tagText"
              class="text-subtitle-1 font-weight-medium black--text"
              color="grey"
              >{{ tagText }}</v-btn
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
          return this.$store.getters["mgr/collectionMedia"];

        case "ItemMedia":
        case "MediaEdit":
          return this.$store.getters["med/itemAllMedia"];

        case "LocusFinds":
          return this.$store.getters["loci/locusFinds"];

        case "AreaSeasonLoci":
          return this.$store.getters["arsn/loci"];
        default:
          console.log(
            `******Wrong source argument (${this.source})for MediaSquare.source`
          );
      }
    },

    item() {
      return this.mediaItems ? this.mediaItems[this.index] : null;
    },

    tagText() {
      switch (this.source) {
        case "Collection":
        case "LocusFinds":
        case "AreaSeasonLoci":
          return this.item.tag;

        case "ItemMedia":
        case "MediaEdit":
          return this.size > 250 ? this.header : null;
      }
    },

    overlay() {
      switch (this.source) {
        case "Collection":
          return OverlayCollectionItem;
        case "AreaSeaesonLoci":
          return OverlayAreaSeasonLoci;
        case "LocusFinds":
          return OverlayLocusFinds;
        case "ItemMedia":
          return OverlayItemMedia;
        case "MediaEdit":
          return OverlayMediaEdit;
      }
    },
  },
};
</script>
<style scoped>
</style>

