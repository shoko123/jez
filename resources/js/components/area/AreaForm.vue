<template>
  <v-container v-if="item" fluid class="pa-1 ma-0">
    <v-row wrap no-gutters>
      <v-textarea
        v-model="item.description"
        label="Description"
        class="mr-1"
        rows="1"
        auto-grow
        readonly
        filled
      ></v-textarea>
      <v-textarea
        v-model="item.notes"
        label="Notes"
        class="mr-1"
        rows="1"
        auto-grow
        readonly
        filled
      ></v-textarea>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    showTags: Boolean,
  },
  computed: {
    item() {
      return this.$store.getters["mgr/item"];
    },
  },
};
</script>



