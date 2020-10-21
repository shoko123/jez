<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="grey py-0 mb-4">
        {{ header }}
        <v-spacer></v-spacer>
        <v-btn class="mx-2" fab text small @click="closeLightBox">
          <v-icon color="primary">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-carousel v-model="lightBoxIndex" height="100%" hide-delimiters>
          <v-carousel-item
            v-for="(image, index) in media"
            :key="index"
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-img
                id="media"
                :src="image.fullUrl"
                :lazy-src="image.tnUrl"
                contain
              ></v-img>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-card-text>
    </v-card>
  </v-container>
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
          return this.$store.getters["loci/locusFinds"];
        case "ItemMedia":
          return this.$store.getters["med/itemAllMedia"];
        case "MediaEdit":
          return this.$store.getters["med/itemAllMedia"];
        case "Collection":
          return this.$store.getters["mgr/collectionMedia"];
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
      },
    },

    show() {
      return this.media ? this.media.length > 0 : false;
    },
    header() {
      switch (this.$store.getters["med/lightBoxSource"]) {
        case "LocusFinds":
          return `Locus ${
            this.$store.getters["mgr/item"].tag
          } finds gallery - "${
            this.$store.getters["loci/locusFinds"][this.lightBoxIndex].tag
          }" ${this.counter}`;
        case "ItemMedia":
          return ` ${this.$store.getters["mgr/appStatus"].module} "${this.$store.getters["mgr/item"].tag}" media gallery ${this.counter}`;
        case "Collection":
          return ` ${
            this.$store.getters["mgr/status"].collectionName
          } collection gallery - "${
            this.$store.getters["mgr/collection"][this.lightBoxIndex].tag
          }" ${this.counter}`;
        default:
          return null;
      }
    },

    counter() {
      return `(${this.lightBoxIndex + 1}/${
        this.media ? this.media.length : 0
      })`;
    },
  },
  methods: {
    closeLightBox() {
      this.$store.commit("med/dialogMediaLightBox", {
        value: false,
        source: null,
        index: 0,
      });
    },
  },
};
</script>
<style scoped>
#media {
  height: 90vh;
}
</style>
