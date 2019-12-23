<template>
  <v-card class="elevation-5 flex d-flex flex-column">
    <v-card-title class="grey py-0 mb-4">Media</v-card-title>
    <v-card-text class="flex">
      <v-row align="center" justify="center">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card>
              <template v-if="image">
                <v-img
                  :src="`${thumbnailsBaseUrl}${image.fileNameThumbnail}`"
                  :lazy-src="`${thumbnailsBaseUrl}${image.fileNameThumbnail}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  height="250"
                  width="250"
                  max-width="250"
                  max-height="250"
                ></v-img>
              </template>
              <template v-else>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  height="250"
                  width="250"
                  max-width="250"
                  max-height="250"
                ></v-img>
              </template>

              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#036358">
                  <h4>yey</h4>

                  <h5>Description: ney</h5>
                  <v-btn dark @click="openLightBox">Open Dialog</v-btn>
                </v-overlay>
              </v-fade-transition>
              <v-dialog v-model="dialogMediaLightBox" persistent class="fill-height">
                <MediaLightBox />
              </v-dialog>
            </v-card>
          </template>
        </v-hover>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import MediaLightBox from "./MediaLightBox";

export default {
  components: { MediaLightBox },

  computed: {
    images() {
      return this.$store.getters["med/images"];
    },
    show() {
      return this.images ? this.images.length > 0 : false;
    },
    image() {
      return this.images ? this.images[0] : null;
    },

    thumbnailsBaseUrl() {
      return `${this.$store.getters["med/storageUrl"]}/DB/images/thumbnails/`;
    },
    imagesBaseUrl() {
      return `${this.$store.getters["med/storageUrl"]}/DB/images/full/`;
    },
    dialogMediaLightBox: {
      get() {
        return this.$store.getters["med/dialogMediaLightBox"];
      },
      set(data) {
        this.$store.commit("med/dialogMediaLightBox", data);
      }
    }
  },
  methods: {
    openLightBox() {
      this.dialogMediaLightBox = true;
    }
  }
};
</script>
