<template>
  <v-carousel
    v-model="lightBoxIndex"
    height="100%"
    :show-arrows="false"
    hide-delimiters
  >
    <v-carousel-item v-for="(item, index) in chunk" :key="index">
      <v-img
        id="lbmedia"
        :src="media.fullUrl"
        :lazy-src="media.tnUrl"
        contain
      ></v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  computed: {
    lightBox() {
      return this.$store.getters["med/lightBox"];
    },

    chunk() {
      return this.lightBox.chunk;
    },

   lightBoxIndex: {
      get() {
        return this.lightBox.indexInChunk;
      },
      set(data) {
        //do nothing - handled by MediaLightBox
      },
    },
    media() {
      return this.lightBox.media;
    },
  },
};
</script>
<style scoped>
#lbmedia {
  height: 90vh;
}
</style>
