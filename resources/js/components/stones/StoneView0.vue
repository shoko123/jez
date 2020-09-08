<template>
  <v-card class="mx-auto mt-2" width="80%" flat>
    <v-card-text>
      <v-row wrap no-gutters>
        <LayoutFormOptionalImage>
          <template v-slot:e1>
            <FindFormBare></FindFormBare>
          </template>
          <template v-slot:e2>
            <template v-if="hasMedia">
              <MediaItem v-bind="{ mediaItem: mediaItem , source: source, index: 0  }"></MediaItem>
            </template>
          </template>
        </LayoutFormOptionalImage>
      </v-row>
      <v-row>
        <!--v-divider inset vertical></v-divider-->
        <v-container fluid>
          <v-card class="elevation-12">
            <StoneForm></StoneForm>
          </v-card>
        </v-container>
      </v-row>
    </v-card-text>
  </v-card>

  <!--LayoutFormOptionalImage>
        <template v-slot:e1>
          <FindFormBare></FindFormBare>
        </template>
        <template v-slot:e2>
          <template v-if="hasMedia">
            <MediaItem v-bind="{ mediaItem: mediaItem , source: source, index: 0  }"></MediaItem>
          </template>
        </template>
  </LayoutFormOptionalImage-->
</template>

<script>
import LayoutFormOptionalImage from "../layouts/LayoutFormOptionalImage";
import Layout2 from "../layouts/Layout2";

import FindFormBare from "../finds/FindFormBare";
import MediaItem from "../media/MediaItem";
import StoneForm from "./StoneForm";

export default {
  components: {
    LayoutFormOptionalImage,
    FindFormBare,
    MediaItem,
    StoneForm,
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
