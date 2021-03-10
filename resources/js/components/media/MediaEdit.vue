
<template>
  <v-container fluid>
    <CollectionForm v-bind="props">
      <template v-slot:actions>
        <v-btn slot="activator" label="tag" @click="add()" class="primary--text mr-2">Add media</v-btn>
        <v-dialog v-model="dialogAddMedia" persistent>
          <MediaUploader />
        </v-dialog>
        <v-btn @click="cancel" class="primary--text mr-2">Back to {{itemType}}</v-btn>
      </template>
    </CollectionForm>
  </v-container>
</template>

<script>
import CollectionForm from "../elements/CollectionForm";
import MediaUploader from "./MediaUploader";

export default {
  components: {
    CollectionForm,
    MediaUploader
  },
  created() {
    this.dialogAddMedia = false;
  },

  computed: {
    itemType() {
      return this.$store.getters["mgr/module"];
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
       this.$store.dispatch("mgr/goToRoute", "back");
    }
  }
};
</script>