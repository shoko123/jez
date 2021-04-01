<template>
  

    <v-row>
      <v-col
        v-for="(item, index) in items"
        :key="item.id"
        cols="2"
      >
        <MediaSquare
          v-bind="{
            source: source,
            index: start + index,
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
     items: Array,
     start: Number
  },

  data() {
    return {};
  },

  computed: {
 
  },

  methods: {
 
  },
};
</script>

