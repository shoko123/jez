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

       <Layout2>
        <template v-slot:e1>
          <MediaGate></MediaGate>
        </template>
        <template v-slot:e2>
          <findForm></findForm>
        </template>
        <template v-slot:e3>
          <TagsForm></TagsForm>
        </template>
      </Layout2>

    </v-row>
    <v-row dense>
      <v-container fluid  class="py-0 my-0">
        <StoneForm></StoneForm>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import Layout1 from "../layouts/Layout1";
import Layout2 from "../layouts/Layout2";
import StoneForm from "./StoneForm";
import findForm from "../finds/findForm";
import MediaGate from "../media/MediaGate";
import TagsForm from "../tags/TagsForm";

export default {
  components: { Layout1, Layout2, findForm, StoneForm, MediaGate, TagsForm }
};
</script>
