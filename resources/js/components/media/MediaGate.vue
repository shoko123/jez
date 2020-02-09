<template>
  <v-card class="elevation-5 flex d-flex flex-column">
    <v-card-title class="grey py-0 mb-4">Photos ({{mediaCounter}})</v-card-title>
    <v-card-text class="flex">
      <v-row align="center" justify="center">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card>
              <template v-if="image">
                <v-img
                  :src="`${image.srcThumbnail}`"
                  :lazy-src="`${image.srcThumbnail}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  height="250"
                  width="350"
                  max-width="350"
                  max-height="250"
                ></v-img>
              </template>
              <template v-else>
                <v-img
                  :src="`${srcFiller}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  height="250"
                  width="350"
                  max-width="350"
                  max-height="250"
                ></v-img>
              </template>

              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#036358">
                  <template v-if="mediaCounter > 0">
                    <v-btn dark @click="openLightBox">Open Lightbox</v-btn>
                  </template>
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
      return this.$store.getters["med/image"];
    },
    srcFiller() {
      return this.$store.getters["med/srcThumbnailFiller"];
    },
    mediaCounter() {
      if (!this.images) {
        return 0;
      }
      return this.images.length;
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
