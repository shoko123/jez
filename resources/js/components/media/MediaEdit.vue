
<template>
  <v-container fluid>
    <MediaGallery v-bind="props">
      <template v-slot:actions>
        <v-btn slot="activator" label="tag" @click="add()" class="primary--text mr-2">Add media</v-btn>
        <v-dialog v-model="dialogAddMedia" persistent>
          <MediaUploader />
        </v-dialog>
        <v-btn @click="cancel" class="primary--text mr-2">back to {{itemType}}</v-btn>
      </template>
    </MediaGallery>
  </v-container>
</template>

<script>
import MediaGallery from "./MediaGallery";
import MediaUploader from "../media/MediaUploader";

export default {
  components: {
    MediaGallery,
    MediaUploader
  },
  created() {
    this.dialogAddMedia = false;
  },

  computed: {
    itemType() {
      return this.$store.getters["mgr/appStatus"].module;
    },
    props() {
      return {
        title: `Media editor for ${this.itemType} ${this.$store.getters["mgr/item"].tag}`,
        source: "MediaEdit"
      };
    },

    dialogAddMedia: {
      get() {
        return this.$store.getters["med/dialogAddMedia"];
      },
      set(data) {
        this.$store.commit("med/dialogAddMedia", data);
      }
    }
  },
  methods: {
    add() {
      this.dialogAddMedia = true;
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>