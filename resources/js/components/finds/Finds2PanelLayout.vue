<template>
      <v-container fluid class="mt-1 pa-1 ma-0">
        <v-row no-gutters>
          <v-col lg="10" offset="1">
            <slot name="e1"></slot>
         <v-divider inset vertical></v-divider>
            <FindForm></FindForm>
          </v-col>
        </v-row>
      </v-container>
 
</template>

<script>
import LayoutFormOptionalImage from "../layouts/LayoutFormOptionalImage";
import Layout2 from "../layouts/Layout2";

import FindForm from "./findForm";
import MediaItem from "../media/MediaItem";

export default {
  components: {
    LayoutFormOptionalImage,
    FindForm,
    MediaItem,
    Layout2,
  },
  computed: {
    mediaArray() {
      return this.$store.getters["med/itemAllMedia"];
    },

    hasMedia() {
      return this.mediaArray ? this.mediaArray.length : false;
    },
    source() {
      return "ItemMedia";
    },

    mediaItem() {
      return this.$store.getters["med/itemOneMedia"];
    },
  },
};
</script>