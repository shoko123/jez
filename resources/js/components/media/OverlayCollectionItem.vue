<template>
  <div>
    <h5>{{ media.text }}</h5>
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
      return this.$store.getters["mgr/collectionMedia"][this.index].hasMedia;
    },
  },
  methods: {
    openLightBox() {
      this.$store.commit("med/dialogMediaLightBox", {
        value: true,
        source: "Collection",
        index: this.index,
      });
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

