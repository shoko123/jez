<template>
  <v-row>
    <v-col v-for="(item, index) in chunk" :key="item.id" cols="2">
      <MediaSquare
        v-bind="{
          source: source,
          caller: 'mediaItem',
          page: page,
          index: index,
          item: item,
          size: 250,
        }"
      ></MediaSquare>
    </v-col>
  </v-row>
</template>

<script>
import MediaSquare from "../media/MediaSquare";

export default {
  components: {
    MediaSquare,
  },

  props: {
    source: String,
    page: Number,
  },

  data() {
    return {};
  },

  computed: {
    chunk() {
      return this.$store.getters["mgr/collections"](this.source).chunk;
    },
  },

  methods: {},
};
</script>

