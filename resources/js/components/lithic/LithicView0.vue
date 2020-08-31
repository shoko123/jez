<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row wrap dense>
      <Layout-1>
        <template v-slot:e1>
          <findForm></findForm>
        </template>
        <template v-slot:e2>
          <MediaGate></MediaGate>
        </template>
      </Layout-1>
    </v-row>
    <v-row dense>
      <v-container fluid class="py-0 my-0">
        <FlintForm></FlintForm>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import Layout1 from "../layouts/Layout1";
import FlintForm from "./FlintForm";
import findForm from "../finds/findForm";
import MediaGate from "../media/MediaGate";

export default {
  components: { Layout1, findForm, FlintForm, MediaGate },
};
</script>
