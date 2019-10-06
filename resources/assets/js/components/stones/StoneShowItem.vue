<template>
  <div>
    <template v-if="showSubMenu">
      <menuSub/>
    </template>
    <findForm></findForm>
    <StoneForm></StoneForm>
  </div>
</template>

<script>
import StoneForm from "./StoneForm";
import findForm from "../finds/findForm";
import menuSub from "../elements/menuSub";
export default {
  name: "stone-show",
  components: { findForm, StoneForm, menuSub },

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
