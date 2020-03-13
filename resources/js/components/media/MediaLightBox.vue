<template>
  <v-card>
    <v-card-title class="grey py-0 mb-4">
      Lightbox
      <v-spacer></v-spacer>
      <v-btn class="mx-2" fab text small @click="closeLightBox">
        <v-icon color="primary">close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-carousel height="100%" hide-delimiters>
        <v-carousel-item
          v-for="(image,index) in media"
          :key="index"
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-row class="fill-height" align="center" justify="center">
            <v-img :src="`${image.srcFull}`" contain max-height="800" max-width="1300">
              <span class="headline white--text" v-text="`${imageText(index)}`"></span>
            </v-img>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    media() {
      switch (this.$store.getters["med/lightBoxSource"]) {
        case "LocusFinds":
          return this.$store.getters["locusFinds/collectionMedia"];
        case "ItemMedia":
          return this.$store.getters["med/itemMedia"];
        case "MediaEdit":
          return this.$store.getters["med/itemMedia"];
        default:
          return null;
      }

      return this.$store.getters["med/itemMedia"];
    },
    show() {
      return this.media ? this.media.length > 0 : false;
    }
  },
  methods: {
    closeLightBox() {
      this.$store.commit("med/dialogMediaLightBox", {
        value: false,
        source: null
      });
    },
    imageText(index) {
      return ` ${this.$store.getters["mgr/status"].itemName} ${
        this.$store.getters["mgr/item"].tag
      } (${index + 1}/${this.media.length})`;
    }
  }
};
</script>
