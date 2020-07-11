<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row wrap dense>
      <!--Layout1>
        <template v-slot:e1>
          <MediaGate></MediaGate>
        </template>
        <template v-slot:e2>
          <findForm></findForm>
        </template>
      </Layout1-->

      <!--Layout2>
        <template v-slot:e1>
          <MediaGate></MediaGate>
          <v-divider inset vertical></v-divider>
          <TagsForm></TagsForm>
        </template>
        <template v-slot:e2>
          <findForm></findForm>
        </template>
        <template v-slot:e3>
          <StoneForm></StoneForm>
        </template>
      </Layout2-->

      <Layout3>
        <template v-slot:e1>
          <MediaGate></MediaGate>
          <v-divider inset vertical></v-divider>
          <TagsForm v-bind="props"></TagsForm>
        </template>
        <template v-slot:e2>
          <findForm></findForm>
          <v-divider inset vertical></v-divider>
          <StoneForm></StoneForm>
        </template>
      </Layout3>
    </v-row>
    <!--v-row dense>
      <v-container fluid  class="py-0 my-0">
        
      </v-container>
    </v-row-->
  </v-container>
</template>

<script>
import Layout1 from "../layouts/Layout1";
import Layout2 from "../layouts/Layout2";
import Layout3 from "../layouts/Layout3";
import StoneForm from "./StoneForm";

import findForm from "../finds/findForm";
import MediaGate from "../media/MediaGate";
import TagsForm from "../tags/TagsForm";

export default {
  components: { Layout1, Layout2, Layout3, findForm, StoneForm, MediaGate, TagsForm },

   computed: {
    props() {
      return {
        isFilterNotNewItem: false,
      };
    }
  }
};
</script>
