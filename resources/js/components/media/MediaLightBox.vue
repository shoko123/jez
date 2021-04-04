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
        <v-carousel
          v-if="isOpen"
          v-model="lightBoxIndex"
          height="100%"
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
    };
  },

  watch: {
    //It is unfortunate that we do pagination here.
    //I tried feed the whole 'main' array to the carousel but it took too long to render.
    //Instead, now we load pages as the user moves thru the collection which gives an appearance of going thru the whole
    //array. It also keeps track of the pageNo so that when a user goes back to the 'results' view
    //she will be in the correct page. It is the only watch in the whole app.
    lightBoxIndex: {
      handler(n, o) {
        console.log("Watch(index) " + o + " => " + n);
        let length = this.lightBox.chunk.length;

        //load new page is zero and action was 'next', or new is max and action was 'previous'.
        if ((n === 0 && o !== 1) || (n === length - 1 && o === 0)) {
          let lb = this.lightBox;
          let pages = Math.floor(lb.length / lb.itemsPerPage);
          let newPage, newIndex;
          console.log(`MLB need to load page. Current pageNo: ${lb.pageNo}`);
          //console.log("lightBox: " + JSON.stringify(this.lightBox, null, 2));
          if (n === 0) {
            //next clicked
            newPage = pages === lb.pageNo ? 1 : lb.pageNo + 2;
          } else {
            //previous clicked;
            newPage = lb.pageNo === 0 ? pages + 1 : lb.pageNo;
          }
          this.loading = true;
          this.$store
            .dispatch("mgr/page", { name: "main", page: newPage })
            .then((res) => {
              if (n !== 0) {
                this.lightBoxIndex = this.lightBox.chunk.length - 1;
              }
              this.loading = false;
            });
        }
      },
    },
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
        //console.log("MLB data" + JSON.stringify(data, null, 2));
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
  },
};
</script>
<style scoped>
#media {
  height: 90vh;
}
</style>
