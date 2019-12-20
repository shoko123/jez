<template>
  <div>
    <template v-if="showSubMenu">
      <SubMenu />
    </template>
    <template v-if="displayDataMode">
      <v-container fluid>
        <v-row dense>
          <v-col xs="12" md="12" lg="2">
            <ItemMediaGate></ItemMediaGate>
          </v-col>
          <v-col xs="12" md="12" lg="10">
            <LocusForm></LocusForm>
          </v-col>
        </v-row>
        <v-row dense>
          <LocusFinds></LocusFinds>
        </v-row>
      </v-container>
    </template>
    <template v-else>
      <MediaGallery></MediaGallery>
    </template>
  </div>
</template> 
</template>

<script>
import LocusForm from "./LocusForm";
import LocusFinds from "./LocusFinds";
import SubMenu from "../menus/SubMenu";
import ItemMediaGate from "../media/ItemMediaGate";
import MediaGallery from "../media/MediaGallery";
import MediaEditor from "../media/MediaEditor";

export default {
  components: {
    LocusFinds,
    LocusForm,
    SubMenu,
    ItemMediaGate,
    MediaGallery,
    MediaEditor
  },

  data() {
    return {};
  },
  computed: {
    showSubMenu() {
      return true;
    },
    displayDataMode() {
      return this.$store.getters["mgr/displayMode"] === "data";
    }
  },

  methods: {}
};
</script>
