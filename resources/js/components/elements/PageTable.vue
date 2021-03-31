<template>
  <v-data-table
    :headers="headers"
    :items="tableItems"
    :items-per-page="5"
    class="elevation-1"
    hide-default-footer
    ><template v-slot:top="{ pagination, options, updateOptions }">
      <v-data-footer
        :pagination="pagination"
        :options="options"
        @update:options="updateOptions"
        items-per-page-text="$vuetify.dataTable.itemsPerPageText"
      /> </template
  ></v-data-table>
</template>

<script>
export default {
  props: {
    source: String,
    items: Array,
    start: Number,
  },

  computed: {
    headers() {
      return [
        {
          text: "Tag",
          align: "start",
          sortable: false,
          value: "tag",
        },
        { text: "Description", value: "description" },
      ];
    },
    
    tableItems() {
      return this.items.map((x) => {
        return { tag: x.tag, description: x.description };
      });
    },
  },

  methods: {
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

