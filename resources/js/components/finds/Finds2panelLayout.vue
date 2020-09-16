<template>
  <v-card class="mx-auto mt-2" width="80%" flat>
    <v-card-text>
      <v-container fluid>
        <v-row no-gutters>
          <v-col>
            <slot name="e1"></slot>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <FindForm></FindForm>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
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