<template>
  <div>
    <template v-if="showPaginator">
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="pages"
          :total-visible="20"
        ></v-pagination>
      </div>
    </template>

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
            indexInChunk: index,
            size: 250,
          }"
        ></MediaSquare>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MediaSquare from "../media/MediaSquare";
import jezConfig from "../../jezConfig";

export default {
  components: {
    MediaSquare,
  },

  props: {
    source: String,
  },

  created() {
    this.page = 1;
  },

  data() {
    return {};
  },

  computed: {
    items() {
      return this.$store.getters["mgr/collections"](this.source);
    },

    collectionMeta() {
      return this.$store.getters["mgr/collectionMeta"](this.source);
    },

    itemsForCurrentPage() {
      switch (this.source) {
        case "Pottery":
        case "Metal":
          return this.$store.getters["mgr/chunk"];
        default:
          return this.items.slice(
            (this.page - 1) * this.itemsPerPage,
            this.page * this.itemsPerPage
          );
      }
    },

    pages() {
      return (
        Math.floor(this.items.length / this.itemsPerPage) +
        (this.items.length % this.itemsPerPage === 0 ? 0 : 1)
      );
    },

    page: {
      get() {
        return this.collectionMeta.page;
      },
      set(data) {
        this.$store.dispatch("mgr/page", {
          collectionName: "Collection",
          pageNo: data,
        });
      },
    },

    itemsPerPage() {
      return jezConfig.mediaPerPage;
    },
    showPaginator() {
      return this.items.length > this.itemsPerPage;
    },
  },

  methods: {
    toggleDisplayOption() {
      console.log(`toggle display option`);
      this.$store.dispatch("mgr/toggleCollectionDisplayOption", this.source);
    },
  },
};
</script>

