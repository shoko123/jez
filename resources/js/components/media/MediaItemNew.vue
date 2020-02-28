<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="mx-auto" max-width="350" max-height="350">
        <v-img :src="srcThumbnail" contain aspect-ratio="1" class="grey lighten-2" max-width="330"></v-img>
        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#036358">           
              <component v-bind:is="overlay" v-bind:image="image"></component>             
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>
    

<script>
import OverlayLocusFinds from "./OverlayLocusFinds";
import OverlayItemMedia from "./OverlayItemMedia";

export default {
  components: {
    OverlayLocusFinds,
    OverlayItemMedia,
  },
  props: {
    image: Object,
    source: String
  },
  created() {
    //console.log("MediaItemNew.created() item: " + JSON.stringify(this.image, null, 2)+ " source: " + this.source);
  },

  computed: {
    srcThumbnail() {
      return "srcThumbnail" in this.image
        ? this.image.srcThumbnail
        : this.$store.getters["med/srcThumbnailFiller"];
    },
    overlay() {
      switch (this.source) {
        case "LocusFinds":
          return OverlayLocusFinds;
        case "ItemMedia":
          return OverlayItemMedia;
      }
    },
  },
  methods: {}
};
</script>

