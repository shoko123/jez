<template>
  <v-container fluid class="mt-1 pa-1 ma-0">
    <LayoutItemCardOptionalImage :header="header"></LayoutItemCardOptionalImage>
    <v-divider inset vertical></v-divider>
    <CollectionForm
      v-bind="{ title: 'Small Finds from Locus', source: 'LocusFinds' }"
    ></CollectionForm>
  </v-container>
</template>

<script>
import LayoutItemCardOptionalImage from "../layouts/LayoutItemCardOptionalImage";
import CollectionForm from "../elements/CollectionForm";

export default {
  components: {
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

