<template>
  <v-container fluid v-if="isReady">
    <v-card>
      <v-card-title class="grey py-0 mb-4">
        {{ header }}
        <v-spacer></v-spacer>
        <template v-if="showArrows">
          <v-btn fab small text @click="clicked(false)">
            <v-icon color="primary">arrow_back</v-icon>
          </v-btn>

          <v-btn fab small text class="ml-2" @click="clicked(true)">
            <v-icon color="primary">arrow_forward</v-icon>
          </v-btn></template
        >
        <v-btn fab text small class="ml-2" @click="closeLightBox">
          <v-icon color="primary">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <LightBoxCarousel/>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import LightBoxCarousel from "./LightBoxCarousel";
export default {
   components: {
    LightBoxCarousel,
   },
  data() {
    return {
      loading: false,
    };
  },

  computed: {
    forceReRender() {
      return this.$store.getters["med/lightBoxForceReRender"];
    },
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
        this.$store.dispatch("med/lightBoxIndex", data);
      },
    },
    media() {
      return this.lightBox.media;
    },

    header() {
      return this.lightBox.header;
    },
  },
  methods: {
    closeLightBox() {
      this.$store.dispatch("med/openLightBox", {
        value: false,
      });
    },
    clicked(isNext) {
      let lb = this.lightBox;
      if (lb.length === 1) {
        return;
      }
      let chunkLength = lb.chunk.length;

      let pages = Math.floor(lb.length / lb.itemsPerPage);
      let setToMax = false;
      let newPage = null;
      /*
      console.log(
        `click(${isNext ? "next" : "prev"} pages: ${
          pages + 1
        } chunkLength ${chunkLength} index: ${this.lightBoxIndex}`
      ); //: " + JSON.stringify(lbx, null, 2));
      */
      if (isNext) {
        if (this.lightBoxIndex === chunkLength - 1) {
          newPage = pages === lb.pageNo ? 1 : lb.pageNo + 2;
          this.lightBoxIndex = 0;
        } else {
          ++this.lightBoxIndex;
        }
      } else {
        //'prev' clicked
        if (this.lightBoxIndex === 0) {
          newPage = lb.pageNo === 0 ? pages + 1 : lb.pageNo;

          //we will set lightBoxIndex after the page is loaded
          setToMax = true;
        } else {
          --this.lightBoxIndex;
        }
      }
      if (newPage === null) {
        return;
      }

      //console.log("Need to load");
      this.loading = true;
      this.$store
        .dispatch("mgr/page", { name: this.lightBox.source, page: newPage })
        .then((res) => {
          //console.log(
          //  `Loaded Chunk. setToMax=${setToMax} length=${this.lightBox.chunk.length - 1}`
          //);
          if (setToMax) {
            this.lightBoxIndex = this.lightBox.chunk.length - 1;
          }
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped>
#lbmedia {
  height: 90vh;
}
</style>
