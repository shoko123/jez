<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="mx-auto" max-width="350" max-height="350">
        <v-img :src="srcThumbnail" contain aspect-ratio="1" class="grey lighten-2" max-width="330"></v-img>

        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#036358">
            <OverlayLocusFinds v-bind:image="image"></OverlayLocusFinds>
          </v-overlay>
        </v-fade-transition>

      </v-card>
    </template>
  </v-hover>
</template>
    

<script>
import OverlayLocusFinds from "./OverlayLocusFinds";


export default {
  components: {
    OverlayLocusFinds,
  },
  props: {
    image: { type: Object }
  },
 

  computed: {
 

    srcThumbnail() {
      return "srcThumbnail" in this.image
        ? this.image.srcThumbnail
        : this.$store.getters["med/srcThumbnailFiller"];
    }
  },
  methods: {
  
  }
};
</script>

