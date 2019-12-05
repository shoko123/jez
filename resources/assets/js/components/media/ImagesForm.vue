<template>
  <div>
    <template v-if="show">
      <v-container fluid>
        <v-card class="elevation-12">
          <v-card-text>
            <v-container fluid>
              <v-row>
                <h3>media</h3>
                <v-col v-for="image in images" :key="image.id" class="d-flex child-flex" cols="2">
                  <v-card class="mx-auto" max-width="350">
                    <v-img
                      :src="`${thumbnailsBaseUrl}${image.fileNameThumbnail}`"
                      :lazy-src="`${thumbnailsBaseUrl}${image.fileNameThumbnail}`"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      max-width="300"
                    ></v-img>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
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
