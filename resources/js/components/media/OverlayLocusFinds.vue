<template>
  <div>
    <h4>{{ image.tag }}</h4>
    <h5>Description: {{ image.description }}</h5>
    <v-btn @click="goTo(image)">Visit</v-btn>
  </div>
</template>
    

<script>

export default {
  props: {
    image: { type: Object }
  },

  computed: {
   
  },
  methods: {
    openLightBox() {
      this.$store.commit("med/lightBoxSource", "LocusFinds");
      this.$store.commit("med/dialogMediaLightBox", true);
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
        default:
          alert("Not implemented yet");
          return;
      }
      this.$router.push({ path: `${path}` });
    }
  }
};
</script>

