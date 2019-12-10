
<template>
  <div>
    <template v-if="showSubMenu">
      <menuSub />
    </template>
    <v-container fluid>
      <v-row dense>
        <v-col :cols="9">
          <findForm></findForm>
        </v-col>
        <v-col :cols="3">
          <ItemMediaGate></ItemMediaGate>
        </v-col>
      </v-row>
      <v-row dense>
        <StoneForm></StoneForm>
      </v-row>
    </v-container>
  </div>
</template>
<!--template>
  <div>
    <template v-if="showSubMenu">
      <menuSub/>
    </template>
    <ImagesForm></ImagesForm>
    <findForm></findForm>
    <StoneForm></StoneForm>
  </div>
</template-->

<script>
import StoneForm from "./StoneForm";
import findForm from "../finds/findForm";
import menuSub from "../elements/menuSub";
//import ImagesForm from "../media/ImagesForm";
import ItemMediaGate from "../media/ItemMediaGate";
export default {
  name: "stone-show",
  components: { findForm, StoneForm, menuSub, ItemMediaGate },

  data() {
    return {};
  },
  computed: {
    showSubMenu() {
      return true;
    }
  },

  methods: {}
};
</script>
