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
      console.log("deleteMedia: " + JSON.stringify(this.media, null, 2));

      this.$store
        .dispatch("med/delete", { mediaType: "Image", id: this.media.id })   
    },
  }
};
</script>

