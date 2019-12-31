<template>
  <v-container fluid class="px-2">
    <v-row dense>
      <v-col sm="12" md="6" lg="3" class="d-flex flex-column">
        <MediaGate></MediaGate>
      </v-col>
      <v-col sm="12" md="6" lg="9" class="d-flex flex-column">
        <LocusForm></LocusForm>
      </v-col>
    </v-row>
    <v-row dense>
      <LocusFinds></LocusFinds>
    </v-row>
    <v-row dense>
      <MediaGallery></MediaGallery>
    </v-row>
  </v-container>
</template> 


<script>
import LocusForm from "./LocusForm";
import LocusFinds from "./LocusFinds";
import MediaGate from "../media/MediaGate";
import MediaGallery from "../media/MediaGallery";

export default {
  components: {
    LocusForm,
    LocusFinds,
    MediaGate,
    MediaGallery
  },

  data() {
    return {};
  },
  computed: {},

  methods: {}
};
</script>
