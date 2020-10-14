<template>
  <LayoutCentralColumn>
    <template v-slot:e1>
      <LayoutItemCardOptionalImage
        :header="header"
      ></LayoutItemCardOptionalImage>
      <v-divider inset vertical></v-divider>
      <FindForm></FindForm>
    </template>
  </LayoutCentralColumn>
</template>

<script>
import LayoutCentralColumn from "./LayoutCentralColumn";
import LayoutItemCardOptionalImage from "./LayoutItemCardOptionalImage";
import FindForm from "../finds/findForm";

export default {
  components: {
    LayoutCentralColumn,
    LayoutItemCardOptionalImage,
    FindForm,
  },
  computed: {
    header() {
      return `${this.$store.getters["mgr/appStatus"].module} Details`;
    },
  },
};
</script>