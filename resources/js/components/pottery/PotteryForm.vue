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
        v-model="item.description"
        label="Description"
        rows="1"
        class="mr-1"
        auto-grow
        readonly
        filled
      ></v-textarea>
    </v-row>
    <template v-if="showTags">
      <v-row wrap no-gutters>
        <div v-for="tag in tags" :key="tag.id" class="font-weight-normal ml-1 text-subtitle-1">
          {{tag.display_name}}:
          <v-chip
            v-for="param in tag.params"
            :key="param.id"
            class="font-weight-normal pa-1 mb-1 body-1"
          >{{param.name}}</v-chip>
        </div>
      </v-row>
    </template>
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
    tags() {
      return this.$store.getters[`aux/itemSelected`];
    },
  },
};
</script>



