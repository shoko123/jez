<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <LocusFinds></LocusFinds>
      </v-row>
    </v-container>
    
  </div>
</template> 


<script>
import LocusForm from "./LocusForm";
import LocusFinds from "./LocusFinds";
import ItemMediaGate from "../media/ItemMediaGate";
import MediaGallery from "../media/MediaGallery";
import MediaEditor from "../media/MediaEditor";

export default {
  components: {
    LocusFinds,
    LocusForm,
    ItemMediaGate,
    MediaGallery,
    MediaEditor
  },

  data() {
    return {};
  },
  computed: {
    displayDataMode() {
      return this.$store.getters["mgr/displayMode"] === "data";
    }
  },

  methods: {}
};
</script>
