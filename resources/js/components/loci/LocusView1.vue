<template>
  <v-container fluid>
    <CollectionForm v-bind="props"></CollectionForm>
  </v-container>
</template> 

<script>
import CollectionForm from "../elements/CollectionForm";

export default {
  components: {
    CollectionForm
  },
  computed: {
    props() {
      return {
        title: "Locus Media Gallery",
        source: "ItemMedia"
      };
    }
  }
};
</script>
