<template>
  <div>
    <template v-if="showItem">
      <SubMenuShowItem></SubMenuShowItem>
    </template>
    <template v-if="showCollection">
      <SubMenuShowCollection></SubMenuShowCollection>
    </template>
  </div>
</template>

<script>
import SubMenuShowItem from "./SubMenuShowItem";
import SubMenuShowCollection from "./SubMenuShowCollection";

export default {
  components: { SubMenuShowItem, SubMenuShowCollection, SubMenuUpdate, SubMenuCreate, SubMenuGallery },
  data() {
    return {};
  },
  computed: {
    showItem() {
      return (this.$store.getters["mgr/status"].action === 'show')
    },
    showCollection() {
      return (this.$store.getters["mgr/status"].action === 'list')
    },
  },
  methods: {}
};
</script>

