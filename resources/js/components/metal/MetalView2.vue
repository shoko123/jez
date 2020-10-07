<template>
  <v-container fluid>
    <CollectionForm v-bind="props"></CollectionForm>
  </v-container>
</template>

<script>
import CollectionForm from "../elements/CollectionForm";

export default {
  components: { CollectionForm },
  computed: {
    props() {
      return {
        title: "Metal Media Gallery",
        source: "ItemMedia",
      };
    },
  },
};
</script>
