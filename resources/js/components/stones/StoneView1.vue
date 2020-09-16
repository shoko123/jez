<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row wrap dense>
      <Layout1>
        <template v-slot:e1>
          <StoneCard :options="{showTags: false, showImage: false}"></StoneCard>
          <v-divider inset vertical></v-divider>
          <findForm></findForm>
        </template>
        <template v-slot:e2>
          <MediaGate></MediaGate>
          <v-divider inset vertical></v-divider>
          <TagsForm v-bind="props"></TagsForm>
        </template>
      </Layout1>
    </v-row>
  </v-container>
</template>

<script>
import Layout1 from "../layouts/Layout1";
import StoneCard from "./StoneCard";

import findForm from "../finds/findForm";
import MediaGate from "../media/MediaGate";
import TagsForm from "../tags/TagsForm";

export default {
  components: { Layout1, findForm, StoneCard, MediaGate, TagsForm },

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
