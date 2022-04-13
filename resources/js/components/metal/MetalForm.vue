<template>
  <v-container v-if="item" fluid class="pa-1 ma-0">
    <v-row wrap no-gutters>
      <v-textarea
        v-model="item.description"
        label="Description"
        rows="1"
        auto-grow
        readonly
        filled
      ></v-textarea>
    </v-row>
    <v-row wrap no-gutters>
      <v-textarea
        v-model="item.measurements"
        label="Measurements"
        rows="1"
        auto-grow
        readonly
        filled
      ></v-textarea>
    </v-row>
      <TagList />
  </v-container>
</template>

<script>
import TagList from "../tags/TagList";
export default {
  components: {
    TagList,
  },
  computed: {
    item() {
      return this.$store.getters["mgr/item"];
    },
    tags() {
      return this.$store.getters[`aux/selectedItemParams`];
    },
  },
};
</script>



