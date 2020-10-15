<template>
  <LayoutCentralColumn>
    <template v-slot:e1>
      <CollectionForm
        v-bind="{ title: 'Locus Media Gallery', source: 'ItemMedia' }"
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
