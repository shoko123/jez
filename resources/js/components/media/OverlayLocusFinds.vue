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
          path = `/finds/stones/${find.findable_id}/show`;
          break;
        case "Pottery":
          path = `/finds/pottery/${find.findable_id}/show`;
          break;
      case "Lithic":
          path = `/finds/lithics/${find.findable_id}/show`;
          break;
        case "Glass":
          path = `/finds/glasses/${find.findable_id}/show`;
          break;          
        default:
          alert("Not implemented yet");
          return;
      }
      this.$router.push({ path: `${path}` });
    },
  },
};
</script>

