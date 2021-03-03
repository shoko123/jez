<template>
  <div>
    <v-btn @click="deleteMedia">delete</v-btn>
  </div>
</template>  

<script>
export default {
  props: {
    media: { type: Object }
  },

  methods: {
    deleteMedia() {
      if (!confirm("Are you sure you want to delete this media item?")) {
        return;
      }

      console.log("deleteMedia: " + JSON.stringify(this.media, null, 2));
      this.$store.dispatch("med/delete", {
        item_type: this.$store.getters["mgr/module"],
        id: this.$store.getters["mgr/item"].id,
        media_id: this.media.media_id
      });
    }
  }
};
</script>

