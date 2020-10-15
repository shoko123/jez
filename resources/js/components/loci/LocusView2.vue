<template>
  <LayoutCentralColumn>
    <template v-slot:e1>
      <CollectionForm
        v-bind="{ title: 'Small Finds from Locus', source: 'LocusFinds' }"
      ></CollectionForm>
    </template>
  </LayoutCentralColumn>
</template>

<script>
import LayoutCentralColumn from "../layouts/LayoutCentralColumn";
import CollectionForm from "../elements/CollectionForm";

export default {
  components: {
    LayoutCentralColumn,
    CollectionForm,
  },
};
</script>