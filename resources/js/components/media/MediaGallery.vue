<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-4">{{ fullTitle }}</v-card-title>
    <v-card-text>
      <template v-if="showPaginator">
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="pages"
            :total-visible="20"
          ></v-pagination>
        </div>
      </template>

      <template v-if="isChips">
        <v-row wrap>
          <v-chip
            v-for="item in itemsForCurrentPage"
            :key="item.id"
            class="font-weight-normal ma-2 body-1"
            @click="goTo(item)"
            >{{ item.tag }}</v-chip
          >
        </v-row>
      </template>
      <template v-else>
        <v-row>
          <v-col
            v-for="(item, index) in itemsForCurrentPage"
            :key="item.id"
            cols="2"
          >
            <MediaItem
              v-bind="{
                mediaItem: item,
                source: source,
                index: index + (page - 1) * itemsPerPage,
              }"
            ></MediaItem>
          </v-col>
        </v-row>
      </template>
    </v-card-text>
    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
import MediaItem from "./MediaItem";
import jezConfig from "../../jezConfig";

export default {
  components: {
    MediaItem,
  },

  props: {
    title: String,
    source: String,
  },
  
  computed: {
    items() {
      switch (this.source) {
        case "Collection":
          if (!this.$store.getters["med/collectionMedia"]) {
            return [];
          } else {
            return this.$store.getters["med/collectionMedia"];
          }

        case "ItemMedia":
          return this.$store.getters["med/itemAllMedia"];

        case "MediaEdit":
          return this.$store.getters["med/itemAllMedia"];

        case "LocusFinds":
          return this.$store.getters["med/locusFindsMedia"];
      }
    },
    fullTitle() {
      switch (this.source) {
        case "MediaEdit":
          return this.title;
        default:
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

    itemsForCurrentPage() {
      return this.items.slice(
        (this.page - 1) * this.itemsPerPage,
        this.page * this.itemsPerPage
      );
    },
    display() {
      return this.$store.getters["mgr/display"];
    },
    pages() {
      return (
        Math.floor(this.items.length / this.itemsPerPage) +
        (this.items.length % this.itemsPerPage === 0 ? 0 : 1)
      );
    },
    page: {
      get() {
        return this.display.currentPage;
      },
      set(data) {
        this.$store.commit("mgr/displaySetCurrentPage", data);
      },
    },

    isChips() {
      return (
        this.source === "Collection" && !this.display.asMedia
      );
    },
    itemsPerPage() {
      return this.isChips ? jezConfig.chipsPerPage : jezConfig.mediaPerPage;
    },
    showPaginator() {
      return this.items.length > this.itemsPerPage;
    },
  },
  methods: {
    //relevant only for mgr/collection on chip view.
    goTo(item) {
      let newPath = `${this.$router.currentRoute.path.replace(
        "list",
        item.id.toString() + "/show"
      )}`;
      console.log("newPath: " + newPath);

      this.$router.push({
        path: `${this.$router.currentRoute.path.replace(
          "list",
          item.id.toString() + "/show"
        )}`,
      });
    },
  },
};
</script>

