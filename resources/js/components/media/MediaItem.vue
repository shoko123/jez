<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="mx-auto" max-width="250" max-height="250">
        <v-img :src="srcThumbnail" contain aspect-ratio="1" class="grey lighten-2" max-width="250">
          <template v-if="!mediaExists">
            <v-container fill-height fluid class="lightbox white--text">
              <component
                v-bind:is="overlay"
                v-bind:media="mediaItem"
                v-bind:source="source"
                v-bind:index="index"
              ></component>
            </v-container>
          </template>
        </v-img>
        <template v-if="mediaExists">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <component
                v-bind:is="overlay"
                v-bind:media="mediaItem"
                v-bind:source="source"
                v-bind:index="index"
              ></component>
            </v-overlay>
          </v-fade-transition>
        </template>
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

  computed: {
    srcThumbnail() {
      return this.mediaItem.tnUrl;
    },

    mediaExists() {
      return this.mediaItem.status === "ready";
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
};
</script>

