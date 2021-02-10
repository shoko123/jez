<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-4"
      >{{ fullTitle }}
      <v-spacer></v-spacer>
      <v-btn
        v-if="allowChips"
        @click="toggleView"
        class="grey black-text"
        small
        outlined
        >{{ displayText }}</v-btn
      >
      <!--v-btn class="mx-2" fab text small @click="toggleView">
          <v-icon color="primary">mdi-eye</v-icon>
        </v-btn-->
    </v-card-title>
    <v-card-text>
      <v-container fluid class="ma-0 pa-0">
        <template v-if="showPaginator">
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="pages"
              :total-visible="20"
            ></v-pagination>
          </div>
        </template>

        <template v-if="showAsImageGallery">
          <v-row>
            <v-col
              v-for="(item, index) in itemsForCurrentPage"
              :key="item.id"
              cols="2"
            >
              <MediaSquare
                v-bind="{
                  source: source,
                  index: index + (page - 1) * itemsPerPage,
                  size: 250,
                }"
              ></MediaSquare>
            </v-col>
          </v-row>
        </template>

        <template v-else>
          <v-row wrap>
            <v-chip
              v-for="(item, index) in itemsForCurrentPage"
              :key="index"
              class="font-weight-normal ma-2 body-1"
              @click="goTo(item)"
              >{{ item.tag }}</v-chip
            >
          </v-row>
        </template>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
import MediaSquare from "../media/MediaSquare";
import jezConfig from "../../jezConfig";

export default {
  components: {
    MediaSquare,
  },

  props: {
    title: String,
    source: String,
  },

  created() {
    this.asGallery = true;
    this.currentPage = 1;
  },

  data() {
    return {
      asGallery: true,
      currentPage: 1,
    };
  },

  computed: {
    items() {
      this.currentPage = 1;
      switch (this.source) {
        case "Collection":
          return this.$store.getters["mgr/collectionMedia"]
            ? this.$store.getters["mgr/collectionMedia"]
            : [];

        case "ItemMedia":
          return this.$store.getters["med/itemAllMedia"];

        case "MediaEdit":
          return this.$store.getters["med/itemAllMedia"];

        case "AreasSeasons":
          return this.$store.getters["arsn/areasSeasons"]
            ? this.$store.getters["arsn/areasSeasons"]
            : [];

        case "AreaSeasonLoci":
          return this.$store.getters["arsn/loci"]
            ? this.$store.getters["arsn/loci"]
            : [];

        case "LocusFinds":
          return this.$store.getters["loci/locusFinds"]
            ? this.$store.getters["loci/locusFinds"]
            : [];

        default:
          console.log(
            `******Wrong source argument (${this.source})for collectionForm`
          );
      }
    },
    fullTitle() {
      switch (this.source) {
        case "MediaEdit":
          return this.title;
        default:
          if (!this.items) {
            return "";
          }
          return `${this.title} (${this.items.length}) ${
            this.showPaginator
              ? `Showing Items ${
                  (this.page - 1) * this.itemsPerPage + 1
                } to ${Math.min(
                  this.page * this.itemsPerPage,
                  this.items.length
                )}`
              : ``
          }`;
      }
    },
    allowChips() {
      return this.source !== "ItemMedia" && this.source !== "MediaEdit";
    },

    itemsForCurrentPage() {
      return this.items.slice(
        (this.page - 1) * this.itemsPerPage,
        this.page * this.itemsPerPage
      );
    },

    pages() {
      return (
        Math.floor(this.items.length / this.itemsPerPage) +
        (this.items.length % this.itemsPerPage === 0 ? 0 : 1)
      );
    },

    page: {
      get() {
        return this.currentPage;
      },
      set(data) {
        this.currentPage = data;
      },
    },
    showAsImageGallery() {
      return this.asGallery;
    },
    itemsPerPage() {
      return this.asGallery ? jezConfig.mediaPerPage : jezConfig.chipsPerPage;
    },
    showPaginator() {
      return this.items.length > this.itemsPerPage;
    },
    displayText() {
      return this.asGallery ? "View: Gallery" : "View: Chips";
    },
  },
  methods: {
    toggleView() {
      this.currentPage = 1;
      this.asGallery = !this.asGallery;
    },

    //relevant only for mgr/collection on chip view.
    goTo(item) {
      //console.log(`goTo() source: ${this.source} newUrl: ${newUrl}`);
      switch (this.source) {
        case "Collection":
          let newUrl = `${
            this.$store.getters["mgr/status"].moduleAppBaseUrl
          }/${item.id.toString()}/show`;
          return this.$router.push({ path: newUrl });

        case "AreasSeasons":
          return this.$router.push({
            path: `/dig-modules/areas-seasons/${item.id.toString()}/show`,
          });
        case "AreaSeasonLoci":
          return this.$router.push({
            path: `/dig-modules/loci/${item.id.toString()}/show`,
          });

        case "LocusFinds":
          return this.goToFind(item);

        default:
          console.log("******Error in CollectionForm goto");
      }
    },

    goToFind(find) {
      let path = null;
      switch (find.findable_type) {
        case "Stone":
        case "Pottery":
        case "Lithic":
        case "Glass":
        case "Metal":
          break;

        default:
          alert("Not implemented yet");
          return;
      }

      this.$router.push({
        path: `${
          this.$store.getters["mgr/myModules"][find.findable_type].appBaseUrl
        }/${find.findable_id}/show`,
      });
    },
  },
};
</script>

