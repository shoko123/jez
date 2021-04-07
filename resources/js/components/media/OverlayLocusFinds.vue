<template>
  <div>
    <h5>{{ media.description }}</h5>
    <v-btn :disabled="disabledFinds(media.findable_type)" @click="goTo(media)">Visit</v-btn>
    <v-btn v-if="showLightBoxOption" @click="openLightBox()"
      >Lightbox</v-btn
    >
  </div>
</template>
    

<script>
export default {
  props: {
    media: Object,
    index: Number,
  },

  computed: {
    showLightBoxOption() {
      return this.media.hasMedia;
    },
  },
  methods: {
    openLightBox() {
      this.$store.commit("med/openLightBox", {
        value: true,
        source: "LocusFinds",
        index: this.index,
      });
      let ipp = (this.$store.getters["mgr/collections"]("media")).itemsPerPage;
      this.$store.dispatch("med/lightBoxIndex", this.index % ipp);      
    },

    disabledFinds(module) {
      switch (module) {
        case "Stone":
        case "Pottery":
        case "Lithic":
        case "Glass":
        case "Metal":
          return false;
        default:
          return true;
      }
    },
    goTo(find) {
      this.$store.dispatch("mgr/goToRoute", {
        module: find.findable_type,
        action: "show",
        id: find.findable_id,
      });
    },
  },
};
</script>

