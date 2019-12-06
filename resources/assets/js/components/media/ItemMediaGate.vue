<template>
  <div>
    <template v-if="show">
      <v-container fluid>
        <v-card class="elevation-12">
          <v-card-title class="grey">Media</v-card-title>
          <v-card-text>
            <v-img
              :src="`${thumbnailsBaseUrl}${image.fileNameThumbnail}`"
              :lazy-src="`${thumbnailsBaseUrl}${image.fileNameThumbnail}`"
              aspect-ratio="1"
              class="grey lighten-2"
              max-width="300"
            ></v-img>
          </v-card-text>
        </v-card>
      </v-container>
    </template>
  </div>
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
