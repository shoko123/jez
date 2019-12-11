<template>
  <v-container fluid class="pa-0 mt-0 mb-2">
    <v-card class="elevation-12">
      <v-card-title class="grey py-0 mb-4">Media</v-card-title>
      <v-card-text>
        <template v-if="show">
          <v-row align="center" justify="center">
            <v-container fluid>
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-card>
                    <v-img
                      :src="`${thumbnailsBaseUrl}${image.fileNameThumbnail}`"
                      :lazy-src="`${thumbnailsBaseUrl}${image.fileNameThumbnail}`"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      max-width="400"
                    ></v-img>
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#036358">
                        <h4>yey</h4>

                        <h5>Description: ney</h5>
                        <v-btn dark @click="openLightBox">Open Dialog</v-btn>
                      </v-overlay>
                    </v-fade-transition>
                    <v-dialog v-model="dialogMediaLightBox" persistent  class="fill-height">
                      <MediaLightBox />
                    </v-dialog>
                  </v-card>
                </template>
              </v-hover>
            </v-container>
          </v-row>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
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
