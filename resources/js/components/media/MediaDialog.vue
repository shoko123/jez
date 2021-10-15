<template>

  <v-container fluid>
    <v-row dense>
    <v-card  width="80%">
      <v-row class="pa-4">
      <v-img height="90vh" :src="media.fullUrl" :lazy-src="media.tnUrl" contain class="grey lighten-2">
        
      </v-img>
      </v-row>
      <!--v-carousel
    v-model="lightBoxIndex"
    height="100%"
    :show-arrows="false"
    hide-delimiters
    class="ma-0 pa-0"
  >
    <v-carousel-item
      class="ma-0 pa-0"
      v-for="(item, index) in chunk"
      :key="index"
    >
      <v-img id="lbmedia" :src="media.fullUrl" :lazy-src="media.tnUrl" contain>
        <v-card class="mx-auto" width="40%" color="transparent" flat>
          <v-card-text class="text-h5 white--text"> {{ text }}</v-card-text>
        </v-card>
      </v-img>
    </v-carousel-item>
  </v-carousel-->
    </v-card>
    <v-card width="20%">
     
    <v-card-title class="ma-0 pa-0 pl-2">
       <v-spacer/>
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
        </v-btn>
      </v-card-title>
       <v-card-text> <v-row color="primary" class="text-h5">{{ header}}</v-row><v-row>{{ text }}</v-row>
       </v-card-text>
    </v-card>
    </v-row>

  </v-container>
</template>

<script>
export default {
   data() {
    return {
      disableArrows: false,
    };
  },
  computed: {
    lightBox() {
      return this.$store.getters["med/lightBox"];
    },

    chunk() {
      return this.lightBox.chunk;
    },

    lightBoxIndex: {
      get() {
        return this.lightBox.indexInChunk;
      },
      set(data) {
        //do nothing - handled by MediaLightBox
      },
    },
    media() {
      if (this.$store.getters["mgr/ready"].chunk) {
        return this.chunk[0];
        //return this.lightBox.media;
      } else {
        return { fullUrl: null, tnUrl: null, hasMedia: false };
      }
    },
    hasMedia() {
      return this.media.hasMedia;
    },
    text() {
      return this.media.description;
    },
    header() {
      return this.lightBox.header;
    },
      showArrows() {
      return this.lightBox.length > 1;
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
<style scoped>

</style>
