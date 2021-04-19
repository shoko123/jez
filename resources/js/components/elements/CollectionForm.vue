<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-4"
      >{{ header }}
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

    collection() {
      return this.$store.getters["mgr/collections"](this.source);
    },
    items() {
      return this.collection.chunk;
    },

    displayOption() {
      return this.collection.views[this.collection.view];
    },

    itemsPerPage() {
      return this.collection.itemsPerPage;
    },
    pages() {
      let length = this.collection.collection.length;
      return (
        Math.floor(length / this.itemsPerPage) +
        (length % this.itemsPerPage === 0 ? 0 : 1)
      );
    },
    page: {
      get() {
        return this.collection.pageNo + 1;
      },
      set(data) {
        this.$store.dispatch("mgr/page", {
          name: this.source,
          page: data,
        });
      },
    },

    start() {
      return this.collection.chunkStartIndex;
    },

    header() {
      let start = this.collection.chunkStartIndex,
        end = start + this.collection.chunk.length,
        length = this.collection.collection.length;
      if (this.$store.getters["mgr/status"].isMediaEdit) {
        return `Media editor for ${this.$store.getters["mgr/module"]} ${this.$store.getters["mgr/item"].tag}`;
      } else {
        return `${this.collection.header} ${
          this.showPaginator ? ` [${start + 1}-${end}/${length}]` : ``
        }`;
      }
    },
    allowChips() {
      return this.source !== "media";
    },

    showPaginator() {
      return (
        this.collection.collection.length > this.itemsPerPage
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

