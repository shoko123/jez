<template>
  <div>
    <component v-bind:is="subMenu"></component>
  </div>
</template>

<script>
import SubMenuShowItem from "./SubMenuShowItem";
import SubMenuShowCollection from "./SubMenuShowCollection";
import SubMenuUpdate from "./SubMenuUpdate";
import SubMenuCreate from "./SubMenuCreate";
import SubMenuGallery from "./SubMenuGallery";
export default {
  components: { SubMenuShowItem, SubMenuUpdate, SubMenuCreate, SubMenuGallery },
  data() {
    return {};
  },
  computed: {
    subMenu() {
      switch (this.$store.getters["mgr/status"].action) {
        case "show":
         
            return "SubMenuShowItem";
        
        case "list":
          return "SubMenuShowCollection";
        case "update":
          return "SubMenuUpdate";
        case "create":
          return "SubMenuCreate";
      }
    }
  },
  methods: {}
};
</script>

