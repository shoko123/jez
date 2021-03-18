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
        <component
          v-bind:is="displayComponent"
          v-bind:source="source"
        ></component>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
import CollectionAsMedia from "./CollectionAsMedia";
import CollectionAsChips from "./CollectionAsChips";
import CollectionAsTable from "./CollectionAsTable";

export default {
  components: {
    CollectionAsMedia,
    CollectionAsChips,
    CollectionAsTable,
  },

  props: {
    title: String,
    source: String,
  },

  created() {
    this.currentPage = 1;
  },

  data() {
    return {
      currentPage: 1,
    };
  },

  computed: {
    displayComponent() {
      return `CollectionAs${this.displayOption}`;
    },

    items() {
      return this.$store.getters["mgr/collections"](this.source);
    }, 

    collectionMeta() {
      return this.$store.getters["mgr/collectionMeta"](this.source);
    },

    displayOptions() {
      return this.collectionMeta.displayOptions;
      //console.log("collectionForm display options: " + JSON.stringify(tagQueryParams, null, 2));
    },
    displayOption() {
      return this.displayOptions[
        this.collectionMeta.displayOptionIndex
      ];
    }, 
    page() {
      return this.collectionMeta.page;
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

    itemsPerPage() {
      return this.collectionMeta.itemsPerPage;
    },

    showPaginator() {
      return (
        this.displayOption !== "Table" && this.items.length > this.itemsPerPage
      );
    },
  },

  methods: {
    toggleDisplayOption() {
      console.log(`toggle display option`);
      this.$store.dispatch("mgr/toggleCollectionDisplayOption", this.source);
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

