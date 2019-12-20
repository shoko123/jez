
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
            <findForm></findForm>
          </v-col>
        </v-row>
        <v-row dense>
          <StoneForm></StoneForm>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script>
import StoneForm from "./StoneForm";
import findForm from "../finds/findForm";
import SubMenu from "../menus/SubMenu";
//import ImagesForm from "../media/ImagesForm";
import ItemMediaGate from "../media/ItemMediaGate";
export default {
  name: "stone-show",
  components: { findForm, StoneForm, SubMenu, ItemMediaGate },

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
