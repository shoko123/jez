<template>
  <div>
    <h4>{{ media.tag }}</h4>
    <h5>{{ media.description }}</h5>
    <v-btn @click="goTo(media)">Visit</v-btn>
    <v-btn v-if="showLightBoxOption" @click="openLightBox()">Open Lightbox</v-btn>
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
      return (
        this.$store.getters["med/locusFindsMedia"][this.index].status == "ready"
      );
    },
  },
  methods: {
    openLightBox() {
      this.$store.commit("med/dialogMediaLightBox", {
        value: true,
        source: "LocusFinds",
        index: this.index,
      });
    },

    goTo(find) {
      let path = null;
      switch (find.findable_type) {
        case "Stone":
        case "Pottery":
        case "Lithic":
        case "Glass":
        case "Metal":
          break;

        default:
          alert("Not implemented yet");
          return;
      }

      this.$router.push({
        path: `${
          this.$store.getters["mgr/myModules"][find.findable_type].appBaseUrl
        }/${find.findable_id}/show`,
      });
    },
  },
};
</script>

