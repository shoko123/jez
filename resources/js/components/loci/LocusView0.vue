<template>
  <LayoutCentralColumn>
    <template v-slot:e1>
      <LayoutItemCardOptionalImage
        :header="header"
      ></LayoutItemCardOptionalImage>
      <v-divider inset vertical></v-divider>
      <CollectionForm
        v-bind="{ title: 'Small Finds from Locus', source: 'LocusFinds' }"
      ></CollectionForm>
    </template>
  </LayoutCentralColumn>
</template>

<script>
import LayoutCentralColumn from "../layouts/LayoutCentralColumn";
import LayoutItemCardOptionalImage from "../layouts/LayoutItemCardOptionalImage";
import CollectionForm from "../elements/CollectionForm";


export default {
  components: {
    LayoutCentralColumn,
    LayoutItemCardOptionalImage,
    CollectionForm,
  },
  computed: {
    header() {
      return `${this.$store.getters["mgr/appStatus"].module} Details`;
    },
  },
};
</script>

