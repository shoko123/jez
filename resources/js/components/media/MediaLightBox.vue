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

  watch: {
    lightBoxIndex: {
      handler(n, o) {
        console.log("Watch(index) " + o + " => " + n);
        let length = this.lightBox.chunk.length;

        //console.log(`Change() event: ${JSON.stringify(event, null, 2)}`);
        if ((n === 0 && o !== 1) || (n === length - 1 && o === 0)) {
          let lb = this.lightBox;
          let pages = Math.floor(lb.length / lb.itemsPerPage);
          let newPage, newIndex;
          console.log(`MLB need to load page. Current pageNo: ${lb.pageNo}`);
          //console.log("lightBox: " + JSON.stringify(this.lightBox, null, 2));
          if (n === 0) {
            console.log("load(next)");
            newPage = pages === lb.pageNo ? 1 : lb.pageNo + 2;
            this.$store
              .dispatch("mgr/page", { name: "main", page: newPage })
              .then((res) => {
                console.log("loadPage returned index set (by carousel) to 0");
              });
          } else {
            console.log("load(previous)");
            newPage = lb.pageNo === 0 ? pages + 1 : lb.pageNo;
            this.$store
              .dispatch("mgr/page", { name: "main", page: newPage })
              .then((res) => {
                //console.log("loadPage returned res: " + JSON.stringify(res, null, 2));
                //console.log("loadPage returned set index=" + this.lightBox.chunk.length - 1);
                this.lightBoxIndex = this.lightBox.chunk.length - 1;
              });
          }
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
      if (!this.lightBox) {
        return "";
      }
      let page = this.lightBox.pageNo + 1;
      let item =
        (page - 1) * this.lightBox.itemsPerPage +
        this.lightBox.indexInChunk +
        1;
      let text = `Showing item(${item}) page ${
        this.lightBox.pageNo + 1
      } index ${this.lightBox.indexInChunk + 1}`;
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
