<template>
  <v-container fluid class="mt-1 pa-1 ma-0">
    <LayoutItemCardOptionalImage
      header="Area/Season Details"
    ></LayoutItemCardOptionalImage>
    <v-divider inset vertical></v-divider>
    <CollectionForm
      v-bind="{ title: 'Loci for Area/Season', source: 'AreaSeasonLoci' }"
    ></CollectionForm>
  </v-container>
</template>

<script>
import LayoutItemCardOptionalImage from "../layouts/LayoutItemCardOptionalImage";
import CollectionForm from "../elements/CollectionForm";
export default {
  components: {
    LayoutItemCardOptionalImage, CollectionForm
  },
};
</script>
