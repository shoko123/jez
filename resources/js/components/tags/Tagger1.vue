<template>
  <v-container fluid class="ma-0">
    <v-row wrap dense>
      <v-col md="12" lg="9" class="d-flex flex-column">
        <TagSelector></TagSelector>
      </v-col>
      <v-col md="12" lg="3" class="d-flex flex-column">
        <TagsForm v-bind="props"></TagsForm>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TagsForm from "./TagsForm";
import TagSelector from "./TagsSelector";

export default {
  components: { TagSelector, TagsForm },
  computed: {
    props() {
      return {
        isFilterNotNewItem: false,
        source: "NewTags",
      };
    },
  },
};
</script>
