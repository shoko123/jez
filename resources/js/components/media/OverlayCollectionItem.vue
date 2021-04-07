<template>
  <div>
    <h5>{{ text }}</h5>
    <v-btn @click="goTo(media.id)">Visit</v-btn>
    <v-btn v-if="showLightBoxOption" @click="openLightBox()">Lightbox</v-btn>
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
    text() {
      let text = this.media.description;
      if (text === null) {
        return "";
      } else {
        return text.length < 101 ? text : text.substr(0, 100) + "...";
      }
    },
  },

  methods: {
    openLightBox() {
      this.$store.commit("med/openLightBox", {
        value: true,
        source: "main",
      });
      let ipp = this.$store.getters["mgr/collectionMain"].itemsPerPage;
      this.$store.dispatch("med/lightBoxIndex", this.index % ipp);
    },

    goTo(id) {
      this.$store.dispatch("mgr/goToRoute", {
        module: this.$store.getters["mgr/module"],
        action: "show",
        id: id,
      });
    },
  },
};
</script>

