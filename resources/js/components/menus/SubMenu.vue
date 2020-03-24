<template>
  <div>
    <template v-if="showItem">
      <SubMenuShowItem></SubMenuShowItem>
    </template>
    <template v-if="showCollection">
      <SubMenuShowCollection></SubMenuShowCollection>
    </template>
    <template v-if="showFilter">
      <SubMenuFilter></SubMenuFilter>
    </template>
  </div>
</template>

<script>
import SubMenuShowItem from "./SubMenuShowItem";
import SubMenuShowCollection from "./SubMenuShowCollection";
import SubMenuFilter from "./SubMenuFilter";

export default {
  components: { SubMenuShowItem, SubMenuShowCollection, SubMenuFilter},
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
    showFilter() {
      return (this.$store.getters["mgr/status"].action === 'filter')
    },
  },
  methods: {}
};
</script>

