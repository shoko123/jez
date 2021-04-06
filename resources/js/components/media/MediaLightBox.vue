<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="grey py-0 mb-4">
        {{ header }}
        <v-spacer></v-spacer>
        <v-btn fab small text @click="clicked(false)">
          <v-icon color="primary">arrow_back</v-icon>
        </v-btn>

        <v-btn fab small text class="ml-2" @click="clicked(true)">
          <v-icon color="primary">arrow_forward</v-icon>
        </v-btn>
        <v-btn fab text small class="ml-2" @click="closeLightBox">
          <v-icon color="primary">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-carousel
          v-if="isOpen"
          v-model="lightBoxIndex"
          height="100%"
          :show-arrows="false"
          hide-delimiters
        >
          <v-carousel-item
            v-for="(item, index) in chunk"
            :key="index"
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-img
                v-if="!loading"
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
    return {
      loading: false,
      goToLastPage: false,
    };
  },

  computed: {
    lightBox() {
      return this.$store.getters["med/lightBox"];
    },

    isOpen() {
      return this.lightBox.isOpen;
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
      //TODO wait while loading
      let page = this.lightBox.pageNo + 1;
      let item =
        (page - 1) * this.lightBox.itemsPerPage +
        this.lightBox.indexInChunk +
        1;
      let text = `Showing ${
        this.$store.getters["mgr/module"]
      } Query results (item ${item}/${this.lightBox.length}): ${
        this.isOpen && !this.loading ? this.media.tag : ""
      } [page ${this.lightBox.pageNo + 1} index ${
        this.lightBox.indexInChunk + 1
      }]`;
      return text;
    },
  },
  methods: {
    closeLightBox() {
      this.$store.commit("med/openLightBox", {
        value: false,
      });
    },
    clicked(isNext) {
      let chunkLength = this.lightBox.chunk.length;
      let lb = this.lightBox;
      let pages = Math.floor(lb.length / lb.itemsPerPage);
      let setToMax = false;
      let newPage = null;
      //console.log("lightBox: " + JSON.stringify(lbx, null, 2));
      if (isNext) {
        if (this.lightBoxIndex === chunkLength - 1 && chunkLength !== 1) {
          newPage = pages === lb.pageNo ? 1 : lb.pageNo + 2;
          this.lightBoxIndex = 0;
        } else {
          ++this.lightBoxIndex;
        }
      } else {
        //'prev' clicked
        if (this.lightBoxIndex === 0 && chunkLength !== 1) {
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
        .dispatch("mgr/page", { name: "main", page: newPage })
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
#media {
  height: 90vh;
}
</style>
