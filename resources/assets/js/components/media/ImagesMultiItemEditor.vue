<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="image in images" :key="image.file" class="d-flex child-flex" cols="2">
        <v-card flat tile class="d-flex">
          <v-img
            :src="`${thumbnailsBaseUrl}${image.fileNameThumbnail}`"
            :lazy-src="`${thumbnailsBaseUrl}${image.fileNameThumbnail}`"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <v-row class="lightbox white--text fill-height ma-0" align="center" justify="center">
              <v-col>
                <div class="subheading">{{image.sceneTag}}</div>
                <div class="body-1">image {{image.image_no}}</div>
              </v-col>
            </v-row>
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    images() {
      return this.$store.getters["med/imagesMultiItem"];
    },

    thumbnailsBaseUrl() {
      return `${this.$store.getters["med/storageUrl"]}/DB/images/thumbnails/`;
    }
  },
  methods: {}
};
</script>

<style scoped>
.v-navigation-drawer {
  transition: none !important;
}

.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}
</style>