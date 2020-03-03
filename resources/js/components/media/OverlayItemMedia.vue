<template>
  <div>
    <v-btn @click="openLightBox()">Open Lightbox</v-btn>   
  </div>
</template>  

<script>


export default {
  methods: {
    openLightBox() {
      this.$store.commit("med/lightBoxSource", "ItemMedia");
      this.$store.commit("med/dialogMediaLightBox", true);
    }
  }
};
</script>

