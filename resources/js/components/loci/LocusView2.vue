<template>
<v-container fluid class="mt-1 pa-1 ma-0">
      <CollectionForm
        v-bind="{ title: 'Small Finds from Locus', source: 'LocusFinds' }"
      ></CollectionForm>
</v-container>
</template>

<script>
import CollectionForm from "../elements/CollectionForm";

export default {
  components: {
    CollectionForm,
  },
};
</script>