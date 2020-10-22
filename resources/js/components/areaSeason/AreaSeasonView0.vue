<template>
  <v-container fluid class="mt-1 pa-1 ma-0">
    <LayoutItemCardOptionalImage
      header="Area?/Season Details"
    ></LayoutItemCardOptionalImage>
    <v-divider inset vertical></v-divider>
  </v-container>
</template>

<script>
import LayoutItemCardOptionalImage from "../layouts/LayoutItemCardOptionalImage";

export default {
  components: {
    LayoutItemCardOptionalImage,
  },
};
</script>