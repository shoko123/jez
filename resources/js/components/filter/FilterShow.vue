<template>
  <v-container fluid>
    <TagsForm v-bind="props"></TagsForm>
  </v-container>
</template>

<script>
import TagsForm from "../tags/TagsForm";

export default {
  components: { TagsForm },

  computed: {
    props() {
      return {
        isFilterNotNewItem: true,
      };
    }
  }
};
</script>