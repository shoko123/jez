<template>
  <v-container fluid class="mt-1 pa-1 ma-0">
    <ItemCard/>
    <v-divider inset vertical></v-divider>
  <CollectionForm
      v-bind="{ title: 'Related AreasSeasons', source: 'related' }"
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
