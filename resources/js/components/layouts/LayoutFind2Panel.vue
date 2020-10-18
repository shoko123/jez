<template>
    <v-container fluid class="mt-1 pa-1 ma-0">
      <LayoutItemCardOptionalImage
        :header="header"
      ></LayoutItemCardOptionalImage>
      <v-divider inset vertical></v-divider>
      <FindForm></FindForm>
    </v-container>
</template>

<script>
import LayoutItemCardOptionalImage from "./LayoutItemCardOptionalImage";
import FindForm from "../finds/findForm";

export default {
  components: {
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