<template>
  <v-container fluid class="pa-0 ma-0">
    <Layout-1>
      <template v-slot:e1>
        <MediaGate></MediaGate>
      </template>
      <template v-slot:e2>
        <LocusForm></LocusForm>
      </template>
    </Layout-1>
    <v-row dense>
      <v-container fluid class="py-1 ma-0">
        <LocusFinds></LocusFinds>
      </v-container>
    </v-row>
  </v-container>
</template> 


<script>
import Layout1 from "../layouts/Layout1";
import LocusForm from "./LocusForm";
import LocusFinds from "./LocusFinds";
import MediaGate from "../media/MediaGate";


export default {
  components: {
    Layout1,
    LocusForm,
    LocusFinds,
    MediaGate,
  },

  data() {
    return {};
  },
  computed: {},

  methods: {}
};
</script>
