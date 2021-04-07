<template>
  <div>
    <v-btn v-if="showLightBoxOption" @click="openLightBox()">Lightbox</v-btn>   
  </div>
</template>  

<script>


export default {
   props: {
    media: Object,
    index: Number
  },
  computed: {
   showLightBoxOption() {
      return this.media.hasMedia;
    },
  },
  methods: {
    openLightBox() {
      this.$store.commit("med/openLightBox", {value: true, source: "media", index: this.index});
      let ipp = (this.$store.getters["mgr/collections"]("media")).itemsPerPage;
      this.$store.dispatch("med/lightBoxIndex", this.index % ipp);
    }
  }
};
</script>

