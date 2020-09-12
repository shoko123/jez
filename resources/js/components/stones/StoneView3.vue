<template>
  <!--v-container fluid class="ma-0">
    <v-row wrap dense-->
      <Layout2>
        <template v-slot:e1>
          <findForm></findForm>
          <v-divider inset vertical></v-divider>
          <StoneForm></StoneForm>
          <v-divider inset vertical></v-divider>
          <MediaGallery v-bind="propsMediaGallery"></MediaGallery>
          <v-divider inset vertical></v-divider>
          <TagsForm v-bind="propsTag"></TagsForm>
        </template>
      </Layout2>
    <!--/v-row>
  </v-container-->
</template>

<script>

import Layout2 from "../layouts/Layout2";
import StoneForm from "./StoneForm";

import findForm from "../finds/findForm";
import MediaGate from "../media/MediaGate";
import TagsForm from "../tags/TagsForm";
import MediaGallery from "../media/MediaGallery";
export default {
  components: {
    Layout2,
    findForm,
    StoneForm,
    MediaGallery,
    TagsForm,
  },

  computed: {
    propsTag() {
      return {
        isFilterNotNewItem: false,
        source: "ItemTags",
      };
    },

    propsMediaGallery() {
      return {
        title: "Stone Media Gallery",
        source: "ItemMedia",
      };
    },
  },
};
</script>

