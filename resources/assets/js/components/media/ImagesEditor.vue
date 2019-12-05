<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="image in images" :key="image.id" class="d-flex child-flex" cols="2">
        <v-hover>
          <template v-slot:default="{ hover }">           
            <v-card class="mx-auto" max-width="350">
              <v-img
                :src="`${thumbnailsBaseUrl}${image.fileNameThumbnail}`"
                :lazy-src="`${thumbnailsBaseUrl}${image.fileNameThumbnail}`"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="330"
              ></v-img>
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#036358">
                  <v-btn @click="deleteImage(image)">Delete</v-btn>
                  <v-btn @click="editImage(image)">Edit</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
            
          </template>
        </v-hover>
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
      return this.$store.getters["med/images"];
    },

    thumbnailsBaseUrl() {
      return `${this.$store.getters["med/storageUrl"]}/DB/images/thumbnails/`;
    },
    imagesBaseUrl() {
      return `${this.$store.getters["med/storageUrl"]}/DB/images/full/`;
    }
  },
  methods: {
    deleteImage(image) {
      console.log("delete image: " + JSON.stringify(image, null, 2));
      this.$store.dispatch("med/delete", {"mediaType": "Image", "id": image.id}).then(res => {
        return res;
      });
    },
    editImage(image) {
      console.log("edit image: " + JSON.stringify(image, null, 2))
    },
  }
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