<template>
  <div v-if="item">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card class="mx-auto" max-width="size" max-height="size">
          <v-img
            :src="size > 250 ? item.fullUrl : item.tnUrl"
            :lazy-src="item.tnUrl"
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
                v-bind:item="item"
                v-bind:source="source"
                v-bind:page="page"
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
import OverlayRelated from "./OverlayRelated";
import OverlayItemMedia from "./OverlayItemMedia";
import OverlayMediaEdit from "./OverlayMediaEdit";
import OverlayCollectionItem from "./OverlayCollectionItem";

export default {
  components: {
    OverlayRelated,
    OverlayItemMedia,
    OverlayMediaEdit,
    OverlayCollectionItem,
  },
  props: {
    source: String,
    caller: String,
    page: Number,
    index: Number,
    item: Object,
    size: Number,
    header: String,
  },

  created() {
    //console.log(
    //  `MediaSquare.created() source: ${this.source} index: ${this.index}`
    //);
  },
  computed: {
    //////

    tagText() {
      switch (this.source) {
        case "main":
        case "related":
          return this.item.tag;

        case "media":
          if (this.caller === "mediaPrimary") {
            let c = this.$store.getters["mgr/collections"]("media");
            return `media (${c.collection.length})`;
          } else {
            return "";
          }
      }
    },

    overlay() {
      switch (this.source) {
        case "main":
          return OverlayCollectionItem;
        case "related":
          return OverlayRelated;
        case "media":
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

