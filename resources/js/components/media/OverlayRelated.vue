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
      return media.hasMedia;
    },
    module() {
      return this.$store.getters["mgr/module"];
    },
  },
  methods: {
    openLightBox() {
      this.$store.commit("med/openLightBox", {
        value: true,
        source: "related",
        index: this.index,
      });
      let ipp = this.$store.getters["mgr/collections"]("media").itemsPerPage;
      this.$store.dispatch("med/lightBoxIndex", this.index % ipp);
    },

    goTo(locus) {
      let module, id;
      switch (this.$store.getters["mgr/module"]) {
        case "Area":
        case "Season":
          module = "AreaSeason";
          id = media.id;
          break;
        case "AreaSeason":
          module = "Locus";
          id = media.id;

          break;
        case "Locus":
          module = media.findable_type;
          id = media.findable_id;
          break;
      }
      this.$store.dispatch("mgr/goToRoute", {
        module: module,
        action: "show",
        id: id,
      });
    },
  },
};
</script>

