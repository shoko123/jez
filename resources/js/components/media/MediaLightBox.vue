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
            v-for="(image, index) in collection"
            :key="index"
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-img
                v-if="item"
                id="media"
                :src="item.fullUrl"
                :lazy-src="item.tnUrl"
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

/*
    media() {
      switch (this.$store.getters["med/lightBoxSource"]) {
        case "AreasSeasons":
          return this.$store.getters["arsn/areasSeasons"];
        case "AreaSeasonLoci":
          return this.$store.getters["arsn/loci"];
        case "LocusFinds":
          return this.$store.getters["loci/locusFinds"];
        case "ItemMedia":
        case "MediaEdit":
          return this.$store.getters["med/itemMedia"];
        case "Collection":
          return this.$store.getters["mgr/collection"];
        default:
          console.log(`******Wrong source (${this.source})for MediaLightBox`);
          return [];
      }
    },
*/
    lightBox(){
      return this.$store.getters["med/lightBox"];
    },
    collection() {
      return this.$store.getters["med/lightBoxCollection"];
    },
    item() {
      return this.$store.getters["med/lightBoxItem"];
    },

    lightBoxIndex: {
      get() {
        return this.$store.getters["med/lightBoxIndex"];
      },
      set(data) {
        this.$store.dispatch("med/lightBoxIndex", data);
      },
    },

    header() {
      return "My LightBox";
      switch (this.$store.getters["med/lightBoxSource"]) {
        case "AreasSeasons":
          return `Showing ${this.$store.getters["mgr/status"].module} ${this.$store.getters["mgr/item"].tag} 
          Related areasSeasons. Showing AreaSeason ${this.counter}: ${
            this.$store.getters["arsn/areasSeasons"][this.lightBoxIndex].tag
          }`;

        case "AreaSeasonLoci":
          return `AreaSeason ${
            this.$store.getters["mgr/item"].tag
          } Loci Gallery. Showing Locus ${this.counter}: ${
            this.$store.getters["arsn/loci"][this.lightBoxIndex].tag
          }`;

        case "LocusFinds":
          return `Locus ${
            this.$store.getters["mgr/item"].tag
          } Finds Gallery. Showing Item  ${this.counter}: ${
            this.$store.getters["loci/locusFinds"][this.lightBoxIndex].tag
          }`;
        case "ItemMedia":
          return ` ${this.$store.getters["mgr/module"]} ${this.$store.getters["mgr/item"].tag} Media Gallery ${this.counter}`;
        case "Collection":
          return ` ${
            this.$store.getters["mgr/status"].collectionName
          } Collection Gallery - ${
            this.$store.getters["mgr/collection"][this.lightBoxIndex].tag
          } ${this.counter}`;
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
