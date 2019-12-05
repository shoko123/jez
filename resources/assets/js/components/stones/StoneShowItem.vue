<template>
  <div>
    <template v-if="showSubMenu">
      <menuSub/>
    </template>
    <ImagesForm></ImagesForm>
    <findForm></findForm>
    <StoneForm></StoneForm>
  </div>
</template>

<script>
import StoneForm from "./StoneForm";
import findForm from "../finds/findForm";
import menuSub from "../elements/menuSub";
import ImagesForm from "../media/ImagesForm";
export default {
  name: "stone-show",
  components: { findForm, StoneForm, menuSub, ImagesForm},

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
