<template>
  <v-card>
    <v-card-title class="grey py-0 mb-4">
      {{header}}
      <v-spacer></v-spacer>
      <v-btn class="mx-2" fab text small @click="closeLightBox">
        <v-icon color="primary">close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-carousel v-model="lightBoxIndex" height="100%" hide-delimiters>
        <v-carousel-item
          v-for="(image,index) in media"
          :key="index"
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-row class="fill-height" align="center" justify="center">
            <v-img :src="image.fullUrl" contain max-height="800" max-width="1300">
            </v-img>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    media() {
      switch (this.$store.getters["med/lightBoxSource"]) {
        case "LocusFinds":
          return this.$store.getters["med/locusFindsMedia"];
        case "ItemMedia":
          return this.$store.getters["med/itemAllMedia"];
        case "MediaEdit":
          return this.$store.getters["med/itemAllMedia"];
        default:
          return null;
      }
    },
    

    lightBoxIndex: {
      get() {
        return this.$store.getters["med/lightBoxIndex"];
      },
      set(data) {
        this.$store.commit("med/lightBoxIndex", data);
      }
    },

    show() {
      return this.media ? this.media.length > 0 : false;
    },
    header() {
      return ` ${this.$store.getters["mgr/status"].itemName} ${
        this.$store.getters["mgr/item"].tag
      } (${this.lightBoxIndex + 1}/${this.media ? this.media.length : 0})`;
    }
  },
  methods: {
    closeLightBox() {
      this.$store.commit("med/dialogMediaLightBox", {
        value: false,
        source: null,
        index: 0
      });
    },
  }
};
</script>
