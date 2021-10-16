<template>
  <v-container fluid v-if="isReady">
    <v-card>
      <v-card-title class="grey py-0 mb-4"
        >{{lightBox.lightBoxHeader}}
        <v-spacer />
        <template v-if="showArrows">
          <v-btn
            fab
            small
            text
            @click="clicked(false)"
            :disabled="disableArrows"
          >
            <v-icon color="primary">arrow_back</v-icon>
          </v-btn>

          <v-btn
            fab
            small
            text
            class="ml-2"
            @click="clicked(true)"
            :disabled="disableArrows"
          >
            <v-icon color="primary">arrow_forward</v-icon>
          </v-btn></template
        >
        <v-btn fab text small class="ml-2" @click="closeLightBox">
          <v-icon color="primary">close</v-icon>
        </v-btn></v-card-title
      >
      <v-card-text>
        <v-row dense>
          <v-card width="80%">
            <MediaCarousel />
          </v-card>

          <v-card width="20%" class="purple lighten-3">
            <v-card-title class="ma-2 text--body-1 bold"> {{ lightBox.itemHeader }}</v-card-title>
            <v-card-text>
              
               <v-row  class="text-body-1">
                 {{ lightBox.itemText }}</v-row>
            </v-card-text>
          </v-card>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import MediaCarousel from "./MediaCarousel";
export default {
  components: {
    MediaCarousel,
  },
  data() {
    return {
      disableArrows: false,
    };
  },
  computed: {
    lightBox() {
      return this.$store.getters["med/lightBox"];
    },

    isReady() {
      return this.lightBox && this.lightBox.isOpen;
    },

    showArrows() {
      return this.lightBox.length > 1;
    },

    chunk() {
      return this.lightBox.chunk;
    },

    lightBoxIndex: {
      get() {
        return this.lightBox.indexInChunk;
      },
      set(data) {
        //console.log("MLB set " + data); //JSON.stringify(data, null, 2));
        //this.$store.dispatch("med/lightBoxIndex", data);
      },
    },

    header() {
      return this.lightBox.header;
    },
   
  },
  methods: {
    closeLightBox() {
      this.$store.commit("med/openLightBox", {
        value: false,
      });
    },
    clicked(isNext) {
      //guaranteed lightBox.length > 1
      this.disableArrows = true;
      this.$store.dispatch("med/lightBoxNext", isNext).then(() => {
        this.disableArrows = false;
      });
    },
  },
};
</script>
