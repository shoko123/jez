<template>
  <v-container v-if="ready" fluid class="pa-1 ma-0">
      <v-row wrap no-gutters>
        <v-textarea
          v-model="item.periods"
          label="Periods"
          rows="1"
          class="mr-1"
          auto-grow
          readonly
          filled
        ></v-textarea>
      </v-row>
      <v-row wrap no-gutters>
        <v-textarea
          v-model="item.notes"
          label="Notes"
          rows="1"
          class="mr-1"
          auto-grow
          readonly
          filled
        ></v-textarea>
      </v-row>
      <v-row wrap no-gutters>
        <v-textarea
          v-model="item.description"
          label="Description"
          rows="1"
          class="mr-1"
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
    ready() {
      return !this.$store.getters["mgr/xhrStatus"].loadingItem;
    },
    item() {
      return this.$store.getters["mgr/item"];
    },
  },
};
</script>



