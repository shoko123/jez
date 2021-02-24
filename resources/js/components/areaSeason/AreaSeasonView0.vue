<template>
  <v-container fluid class="mt-1 pa-1 ma-0">
    <ItemCard></ItemCard>
    <v-divider inset vertical></v-divider>
    <CollectionForm
      v-bind="{ title: 'Loci for Area/Season', source: 'AreaSeasonLoci' }"
    ></CollectionForm>
  </v-container>
</template>

<script>
import ItemCard from "../layouts/ItemCard";
import CollectionForm from "../elements/CollectionForm";
export default {
  components: {
    ItemCard, CollectionForm
  },
};
</script>
