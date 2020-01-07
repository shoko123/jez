<template>
<v-container fluid>
  <v-card class="elevation-12">
    <template v-if="ready">
      <v-card-title class="orange py-0 mb-4">Media Editor for {{itemTypeAndTag}}</v-card-title>
      <v-card-text>
        <!--v-tabs>
          <v-tab>Images</v-tab>
          <v-tab>Muti-item Images</v-tab>
          <v-tab>Illustrations</v-tab>
          <v-tab>Plans</v-tab>
        </v-tabs-->
        <v-row>
          <v-col v-for="image in images" :key="image.id" cols="2">
            <MediaItem v-bind:image="image"></MediaItem>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn slot="activator" label="tag" @click="add()" class="primary--text mr-2">Add media</v-btn>
        <v-dialog v-model="dialogAddMedia" persistent>
          <MediaUploader />
        </v-dialog>
        <v-btn @click="cancel" class="primary--text mr-2">back to {{itemType}}</v-btn>
      </v-card-actions>
    </template>
  </v-card>
</v-container>
</template>
    

<script>
import MediaUploader from "./MediaUploader";
import MediaItem from "./MediaItem";
export default {
  components: {
    MediaItem,
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
        this.itemType +
        " " +
        this.$store.getters["mgr/item"].tag
      );
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
  },
  methods: {
    add() {
      this.dialogAddMedia = true;
    },
    cancel() {
      this.$router.go(-1);
    },
  }
};
</script>

