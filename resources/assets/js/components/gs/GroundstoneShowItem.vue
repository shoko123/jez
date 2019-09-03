<template>
  <div>
    <template v-if="showSubMenu">
      <menuSub/>
    </template>
    <findForm></findForm>
    <GroundstoneForm></GroundstoneForm>
  </div>
</template>

<script>
import GroundstoneForm from "./GroundstoneForm";
import findForm from "../finds/findForm";
import menuSub from "../elements/menuSub";
export default {
  name: "gs-show",
  components: { findForm, GroundstoneForm, menuSub },

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
