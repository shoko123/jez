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
      return this.$store.getters["arsn/areasSeasons"][this.index].hasMedia;
    },
  },
  methods: {
    openLightBox() {
      this.$store.commit("med/dialogMediaLightBox", {
        value: true,
        source: "AreasSeasons",
        index: this.index,
      });
    },

    goTo(as) {
      this.$store.dispatch("mgr/goToRoute", {
        module: "AreaSeason",
        action: "show",
        id: as.id,
      });
    },
  },
};
</script>

