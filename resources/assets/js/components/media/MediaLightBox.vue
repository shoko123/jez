<template>
  <v-card>
    <v-card-title class="grey py-0 mb-4">
      Lightbox
      <v-spacer></v-spacer>
      <v-btn class="mx-2" fab text @click="closeLightBox">
        <v-icon color="primary">close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-carousel height="100%" hide-delimiters>
        <v-carousel-item
          v-for="(image,index) in images"
          :key="index"
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-row class="fill-height" align="center" justify="center">
            <v-img
              :src="`${imagesBaseUrl}${image.fileName}`"
              width="1000"
              height="700"
              max-height="700"
              max-width="1000"
            >
              <span class="headline white--text" v-text="`${imageText(index)}`"></span>
            </v-img>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
    <v-card-actions>
      <v-btn dark @click="closeLightBox">Close Dialog</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    images() {
      return this.$store.getters["med/images"];
    },
    show() {
      return this.images ? this.images.length > 0 : false;
    },
    dialogMediaLightBox: {
      get() {
        return this.$store.getters["med/dialogMediaLightBox"];
      },
      set(data) {
        this.$store.commit("med/dialogMediaLightBox", data);
      }
    },

    thumbnailsBaseUrl() {
      return `${this.$store.getters["med/storageUrl"]}/DB/images/thumbnails/`;
    },
    imagesBaseUrl() {
      return `${this.$store.getters["med/storageUrl"]}/DB/images/full/`;
    }
  },
  methods: {
    closeLightBox() {
      this.dialogMediaLightBox = false;
    },
    imageText(index) {
      return ` ${this.$store.getters["mgr/status"].itemName} ${
        this.$store.getters["mgr/item"].tag
      } (${index + 1}/${this.images.length})`;
    }
  }
};
</script>
