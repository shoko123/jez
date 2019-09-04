<template>
  <div>
    <template v-if="showSubMenu">
      <menuSub/>
    </template>
    <LocusForm></LocusForm>
    <LocusFinds></LocusFinds>
  </div>
</template>

<script>
import LocusForm from "./LocusForm";
import LocusFinds from "./LocusFinds";
import menuSub from "../elements/menuSub";
export default {

  components: { LocusFinds, LocusForm, menuSub },

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
