<template>
  <div>
    <template v-if="showSubMenu">
      <menuSub/>
    </template>
    <findForm></findForm>
    <gsForm></gsForm>
  </div>
</template>

<script>
import gsForm from "./gsForm";
import findForm from "../finds/findForm";
import menuSub from "../elements/menuSub";
export default {
  name: "gs-show",
  components: { findForm, gsForm, menuSub },

data() {
    return {};
  },
  computed: {
   
    showSubMenu() {
      return true;
      return this.$store.getters.showSubMenu;
    }

  },

  methods: {}
};


</script>
