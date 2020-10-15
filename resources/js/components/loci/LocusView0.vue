<template>
  <LayoutCentralColumn>
    <template v-slot:e1>
      <LayoutItemCardOptionalImage
        :header="header"
      ></LayoutItemCardOptionalImage>
      <v-divider inset vertical></v-divider>
      <LocusFinds></LocusFinds>
    </template>
  </LayoutCentralColumn>
</template>

<script>
import LayoutCentralColumn from "../layouts/LayoutCentralColumn";
import LayoutItemCardOptionalImage from "../layouts/LayoutItemCardOptionalImage";
import LocusFinds from "./LocusFinds";

export default {
  components: {
    LayoutCentralColumn,
    LayoutItemCardOptionalImage,
    LocusFinds,
  },
  computed: {
    header() {
      return `${this.$store.getters["mgr/appStatus"].module} Details`;
    },
  },
};
</script>

