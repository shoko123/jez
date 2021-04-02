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
        <v-carousel v-if="lightBox" v-model="lightBoxIndex" height="100%" hide-delimiters>
          <v-carousel-item
            v-for="(item, index) in collection"
            :key="index"
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-img
                id="media"
                :src="media.fullUrl"
                :lazy-src="media.tnUrl"
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
    lightBox(){
      return this.$store.getters["med/lightBox"];
    },

     collection() {
      return this.lightBox.collection;
    },

    chunk() {
      return this.lightBox.chunk;
    },
   

    lightBoxIndex: {
      get() {
        return this.lightBox.indexInCollection;
      },
      set(data) {
        console.log("MLB data" + JSON.stringify(data, null, 2));
        this.$store.dispatch("med/lightBoxIndex", data);
      },
    },
     media() {
      return this.lightBox.media;
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
      this.$store.commit("med/openLightBox", {
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
