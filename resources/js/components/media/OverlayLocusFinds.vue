<template>
  <div>
    <h4>{{ image.tag }}</h4>
    <h5>Description: {{ image.description }}</h5>
    <v-btn @click="goTo(image)">Visit</v-btn>
  </div>
</template>
    

<script>
import MediaLightBox from "./MediaLightBox";

export default {
  components: {
    MediaLightBox
  },
  props: {
    image: { type: Object }
  },
  created() {
    this.dialogAddMedia = false;
  },

  data() {
    return {
      dialog: false
    };
  },

  computed: {
    dialogMediaLightBox: {
      get() {
        return this.$store.getters["med/dialogMediaLightBox"];
      },
      set(data) {
        this.$store.commit("med/dialogMediaLightBox", data);
      }
    }
  },
  methods: {
    openLightBox() {
      console.log("openLightBox");
      this.dialogMediaLightBox = true;
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

