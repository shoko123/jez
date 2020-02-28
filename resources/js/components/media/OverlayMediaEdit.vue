<template>
  <div>
    <v-btn @click="deleteMedia">delete</v-btn>   
  </div>
</template>  

<script>


export default {
  props: {
    image: { type: Object }
  },
  
  methods: {
    deleteMedia() {
      console.log("deleteMedia: " + JSON.stringify(this.image, null, 2));

      this.$store
        .dispatch("med/delete", { mediaType: "Image", id: this.image.id })   
    },
  }
};
</script>

