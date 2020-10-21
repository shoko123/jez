<template>
  <v-toolbar dense>
    <CollectionButtons />
    <v-spacer></v-spacer>

    <v-btn @click="toggleDisplayOption" class="primary--text" large outlined>{{
      displayOption
    }}</v-btn>
  </v-toolbar>
</template>

<script>
import CollectionButtons from "./CollectionButtons";

export default {
  components: { CollectionButtons },
  computed: {
    displayOption() {
      return this.$store.getters["mgr/display"].asMedia
        ? "View: Gallery"
        : "View: Chips";
    },
  },
  methods: {
    toggleDisplayOption() {
      this.$store.commit("mgr/displaySetCurrentPage", {
        source: "Collection",
        page: 1,
      });
      this.$store.commit("mgr/displayToggleCollectionView", null);
    },
  },
};
</script>