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

    <v-row wrap>
      <v-chip
        v-for="(item, index) in itemsForCurrentPage"
        :key="index"
        :disabled="disabledChips(item)"
        class="font-weight-normal ma-2 body-1"
        @click="goTo(item)"
        >{{ item.tag }}</v-chip
      >
    </v-row>
  </div>
</template>

<script>

import jezConfig from "../../jezConfig";

export default {
  props: {
    title: String,
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
        return this.collectionMeta.page;
      },
      set(data) {
          this.$store.dispatch("mgr/page", {collectionName: "Collection", pageNo: data});
      },
    },

    itemsPerPage() {
      return jezConfig.chipsPerPage;
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

    disabledChips(item) {
      if (this.source !== "LocusFinds") {
        return false;
      }
      switch (item.findable_type) {
        case "Stone":
        case "Pottery":
        case "Lithic":
        case "Glass":
        case "Metal":
          return false;
        default:
          return true;
      }
    },
    //relevant only for chip view.
    goTo(item) {
      //console.log(`goTo() source: ${this.source} newUrl: ${newUrl}`);
      let module = null,
        id = null;
      switch (this.source) {
        case "Collection":
          module = this.$store.getters["mgr/module"];
          break;
        case "AreasSeasons":
          module = "AreaSeason";
          break;
        case "AreaSeasonLoci":
          module = "Locus";
          break;
        case "LocusFinds":
          module = item.findable_type;
          break;
      }

      switch (this.source) {
        case "Collection":
        case "AreasSeasons":
        case "AreaSeasonLoci":
          id = item.id;
          break;
        case "LocusFinds":
          id = item.findable_id;
      }

      this.$store.dispatch("mgr/goToRoute", {
        module: module,
        action: "show",
        id: id,
      });
    },
  },
};
</script>

