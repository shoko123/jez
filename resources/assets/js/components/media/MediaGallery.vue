<template>
  <v-container fluid>
    <v-card class="elevation-12">
      <template v-if="ready">
        <!--v-card-title class="grey py-0 mb-4">Media {{galleryOrEditor}} for {{itemTypeAndTag}}</v-card-title-->
        <v-card-title
          v-bind:class="[isEdit ? 'orange' : 'grey', 'py-0', 'mb-4']"
        >Media {{galleryOrEditor}} for {{itemTypeAndTag}}</v-card-title>
        <v-card-text>
          <v-tabs>
            <v-tab>Images</v-tab>
            <v-tab>Muti-item Images</v-tab>
            <v-tab>Illustrations</v-tab>
            <v-tab>Plans</v-tab>
          </v-tabs>
          <v-row>
            <v-col v-for="image in images" :key="image.id" cols="2">
              <template v-if="isEdit">
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-card class="mx-auto" max-width="350" max-height="350">
                      <template v-if="true">
                        <v-img
                          :src="`${image.srcThumbnail}`"
                          :lazy-src="`${image.srcThumbnail}`"
                          aspect-ratio="1"
                          class="grey lighten-2"
                          max-width="330"
                        ></v-img>
                      </template>
                      <v-fade-transition>
                        <v-overlay v-if="hover" absolute color="#036358">
                          <v-btn @click="deleteImage(image)">Delete</v-btn>
                          <v-btn @click="editImage(image)">Edit</v-btn>
                        </v-overlay>
                      </v-fade-transition>
                    </v-card>
                  </template>
                </v-hover>
              </template>
              <template v-else>
                <v-card class="mx-auto" max-width="350" max-height="350">
                  <v-img
                    :src="`${image.srcThumbnail}`"
                    :lazy-src="`${image.srcThumbnail}`"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="330"
                  ></v-img>
                </v-card>
              </template>
            </v-col>
          </v-row>
        </v-card-text>
        <template v-if="isEdit">
          <v-card-actions>
            <v-btn slot="activator" label="tag" @click="add()" class="primary--text mr-2">Add media</v-btn>
            <v-dialog v-model="dialogAddMedia" persistent>
              <MediaUploader />
            </v-dialog>
            <v-btn @click="cancel" class="primary--text mr-2">back to {{itemType}}</v-btn>
          </v-card-actions>
        </template>
      </template>
    </v-card>
  </v-container>
</template>
    

<script>
import MediaUploader from "./MediaUploader";

export default {
  components: {
    MediaUploader
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
    ready() {
      return this.$store.getters["mgr/item"];
    },
    itemType() {
      return this.$store.getters["mgr/status"].itemName;
    },
    itemTypeAndTag() {
      return (
        this.$store.getters["mgr/status"].itemName +
        " " +
        this.$store.getters["mgr/item"].tag
      );
    },
    isEdit() {
      return this.$store.getters["mgr/status"].isMediaEdit;
    },

    galleryOrEditor() {
      return this.isEdit ? "editor" : "gallery";
    },
    dialogAddMedia: {
      get() {
        return this.$store.getters["med/dialogAddMedia"];
      },
      set(data) {
        this.$store.commit("med/dialogAddMedia", data);
      }
    },

    images() {
      return this.$store.getters["med/images"];
    },

    ok() {
      return true;
    }
  },
  methods: {
    add() {
      this.dialogAddMedia = true;
    },
    cancel() {
      this.$router.go(-1);
    },
    deleteImage(image) {
      console.log("delete image: " + JSON.stringify(image, null, 2));
      this.$store
        .dispatch("med/delete", { mediaType: "Image", id: image.id })
        .then(res => {
          return res;
        });
    },
    editImage(image) {
      console.log("edit image: " + JSON.stringify(image, null, 2));
    }
  }
};
</script>

