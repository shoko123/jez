<template>
  <LayoutItemCardOptionalImage header="Pottery Details">
    <template v-slot:e1>
      <PotteryForm :showTags="options.showTags"></PotteryForm>
    </template>
  </LayoutItemCardOptionalImage>
</template>

<script>
import PotteryForm from "./PotteryForm";
import LayoutItemCardOptionalImage from "../layouts/LayoutItemCardOptionalImage";

export default {
  components: {
    PotteryForm,
    LayoutItemCardOptionalImage,
  },
  props: {
    options: Object,
  },
};
</script>