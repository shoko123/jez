<template>
  <v-container fluid>
    <CollectionForm  v-bind="{ source: 'media' }"></CollectionForm>
  </v-container>
</template>

<script>
import CollectionForm from "../elements/CollectionForm";

export default {
  components: { CollectionForm },
};
</script>
