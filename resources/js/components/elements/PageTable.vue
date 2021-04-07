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
    page: Number,
  },

  computed: {
    chunk() {
      return this.$store.getters["mgr/collections"](this.source).chunk; //.chunk;
    },
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
      return this.chunk.map((x) => {
        return { tag: x.tag, description: x.description };
      });
    },
  },

  methods: {},
};
</script>

