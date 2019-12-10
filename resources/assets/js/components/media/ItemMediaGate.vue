<template>
  <v-container fluid class="pa-0 mt-0 mb-2">
    <v-card class="elevation-12">
      <v-card-title class="grey py-0 mb-4">Media</v-card-title>
      <v-card-text >
        <template v-if="show">
          <v-row align="center" justify="center">
          <v-img
            :src="`${thumbnailsBaseUrl}${image.fileNameThumbnail}`"
            :lazy-src="`${thumbnailsBaseUrl}${image.fileNameThumbnail}`"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="300"
          ></v-img>
          </v-row>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
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
    image() {
      return this.images ? this.images[0] : null;
    },

    thumbnailsBaseUrl() {
      return `${this.$store.getters["med/storageUrl"]}/DB/images/thumbnails/`;
    },
    imagesBaseUrl() {
      return `${this.$store.getters["med/storageUrl"]}/DB/images/full/`;
    }
  },
  methods: {}
};
</script>
