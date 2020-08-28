<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-4">{{fullTitle}}</v-card-title>
    <v-card-text>
      <template v-if="showPaginator">
        <div class="text-center">
          <v-pagination v-model="page" @input="showPage" :length="pages" :total-visible="20"></v-pagination>
        </div>
      </template>

      <v-row>
        <v-col v-for="(item, index) in itemsForCurrentPage" :key="item.id" cols="2">
          <MediaItem v-bind="{ mediaItem: item, source: source, index: index + (page -1) * mediaPerPage}"></MediaItem>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
import MediaItem from "./MediaItem";

export default {
  components: {
    MediaItem
  },

  props: {
    title: String,
    source: String
  },

  created() {
    //console.log(`MediaGallery.created() title: ${this.title} source: ${this.source}`);
  },
  data() {
    return {
      page: 1,
      mediaPerPage: 18,
    };
  },
  computed: {
    showPaginator() {
      return this.items.length > this.mediaPerPage;
    },

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

    itemsForCurrentPage() {
      return this.items.slice(
        (this.page - 1) * this.mediaPerPage,
        this.page * this.mediaPerPage
      );
    },

    fullTitle() {
      switch (this.source) {
        case "MediaEdit":
          return this.title;
        default:
          return `${this.title} (${this.items.length}) ${this.showPaginator ? `Showing Items ${(this.page - 1) * this.mediaPerPage + 1} to ${Math.min(this.page * this.mediaPerPage, this.items.length)}` : ``}`;
      }
    },
    pages() {
      return Math.floor(this.items.length / this.mediaPerPage) + (((this.items.length % this.mediaPerPage) === 0) ? 0 : 1);
    }
  },
  methods: {
    showPage(page_no) {
      //console.log("showPage " + page_no);
      this.page = page_no;
    }
  }
};
</script>

