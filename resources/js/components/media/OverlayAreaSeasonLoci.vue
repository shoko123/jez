<template>
  <div>
    <h5>{{ media.description }}</h5>
    <v-btn @click="goTo(media)">Visit</v-btn>
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
      return this.$store.getters["arsn/areaSeasonLoci"][this.index].hasMedia;
    },
  },
  methods: {
    openLightBox() {
      this.$store.commit("med/dialogMediaLightBox", {
        value: true,
        source: "AreaSeasonLoci",
        index: this.index,
      });
    },

    goTo(locus) {
      this.$router.push({
        path: `${this.$store.getters["mgr/myModules"]["Locus"].appBaseUrl}/${locus.id}/show`,
      });
    },
  },
};
</script>

