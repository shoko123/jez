<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-4"
      >{{ fullTitle }}
      <v-spacer></v-spacer>

      <v-btn
        v-if="allowChips"
        class="grey black-text"
        small
        outlined
        @click="toggleDisplayOption()"
        >view: {{ displayOption }}
      </v-btn>
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
        <component
          v-bind:is="displayComponent"
          v-bind:source="source"
          v-bind:page="page"
        ></component>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
import PageMedia from "./PageMedia";
import PageChips from "./PageChips";
import PageTable from "./PageTable";

export default {
  components: {
    PageMedia,
    PageChips,
    PageTable,
  },

  props: {
    title: String,
    source: String,
  },

  computed: {
    displayComponent() {
      return `Page${this.displayOption}`;
    },

    collections() {
      return this.$store.getters["mgr/collections"](this.source);
    },
    items() {
      return this.collections.chunk;
    },

    displayOption() {
      return this.collections.views[this.collections.view];
    },

    itemsPerPage() {
      return this.collections.itemsPerPage;
    },
    pages() {
      let length = this.collections.collection.length;
      return (
        Math.floor(length / this.itemsPerPage) +
        (length % this.itemsPerPage === 0 ? 0 : 1)
      );
    },
    page: {
      get() {
        return this.collections.pageNo + 1;
      },
      set(data) {
        this.$store.dispatch("mgr/page", {
          name: "main",
          page: data,
        });
      },
    },

    start() {
      return this.collections.chunkStartIndex;
    },

    fullTitle() {
      switch (this.source) {
        case "MediaEdit":
          return this.title;
        default:
          if (!this.items) {
            return "";
          }

          return `${this.title} (${this.collections.collection.length}) ${
            this.showPaginator
              ? `Showing Items ${this.collections.chunkStartIndex + 1} to ${
                  this.collections.chunkStartIndex +
                  this.collections.chunk.length
                }`
              : ``
          }`;
      }
    },
    allowChips() {
      return this.source !== "media";
    },

    showPaginator() {
      return (
        this.displayOption !== "Table" &&
        this.collections.collection.length > this.itemsPerPage
      );
    },
  },

  methods: {
    toggleDisplayOption() {
      console.log(`toggle display option`);
      this.$store.dispatch("mgr/toggleCollectionView", this.source);
    },
  },
};
</script>

