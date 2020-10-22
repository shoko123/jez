<template>
   <v-container fluid class="mt-1 pa-1 ma-0">
    <CollectionForm
      v-bind="{ title: 'Loci for Area/Season', source: 'AreaSeasonLoci' }"
    ></CollectionForm>
  </v-container>
</template>

<script>
import CollectionForm from "../elements/CollectionForm";
export default {
  components: {
    CollectionForm
  },
};
</script>