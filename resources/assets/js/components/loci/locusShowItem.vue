<template>
  <div>
    <template v-if="showSubMenu">
      <menuSub/>
    </template>
    <findForm></findForm>
    <LocusForm></LocusForm>
  </div>
</template>

<script>
import LocusForm from "./LocusForm";
import findForm from "../finds/findForm";
import menuSub from "../elements/menuSub";
export default {

  components: { findForm, LocusForm, menuSub },

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
