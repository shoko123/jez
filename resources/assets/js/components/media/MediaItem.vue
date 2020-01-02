<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="mx-auto" max-width="350" max-height="350">
        <v-img
          :src="`${image.srcThumbnail}`"
          :lazy-src="`${image.srcThumbnail}`"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="330"
        ></v-img>

        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#036358">
            <template v-if="isEdit">
              <v-btn @click="deleteImage()">Delete</v-btn>
              <v-btn @click="editImage()">Edit</v-btn>
            </template>
            <template v-else>
              <v-btn @click="openLightBox()">Open Lightbox</v-btn>
            </template>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>
    

<script>
import MediaUploader from "./MediaUploader";

export default {
  components: {
    MediaUploader
  },
  props: {
    image: { type: Object }
  },
  created() {
    this.dialogAddMedia = false;
  },

  data() {
    return {
      dialog: false
    };
  },

  computed: {
    isEdit() {
      return this.$store.getters["mgr/status"].isMediaEdit;
    }
  },
  methods: {
    deleteImage() {
      console.log("delete image: " + JSON.stringify(this.image, null, 2));
      
      this.$store
        .dispatch("med/delete", { mediaType: "Image", id: this.image.id })
        .then(res => {
          return res;
        });
        
    },
    editImage() {
      console.log("edit image");
    },
    openLightBox() {
      console.log("openLightBox");
    }
  }
};
</script>

