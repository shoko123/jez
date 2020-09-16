<template>
  <v-container fluid class="pa-1 ma-0">
    <v-row wrap dense>
      <v-col lg="9">
        <slot name="e1"></slot>
        <v-divider inset vertical></v-divider>
        <findForm></findForm>
      </v-col>
      <v-col lg="3" class="pr-2">
        <MediaGate></MediaGate>
        <v-divider inset vertical></v-divider>
        <TagsForm v-bind="props"></TagsForm>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import findForm from "../finds/findForm";
import MediaGate from "../media/MediaGate";
import TagsForm from "../tags/TagsForm";

export default {
  name: "Finds4PanelLayout",
  components: { findForm, MediaGate, TagsForm },

  computed: {
    props() {
      return {
        isFilterNotNewItem: false,
        source: "ItemTags",
      };
    },
  },
};
</script>
