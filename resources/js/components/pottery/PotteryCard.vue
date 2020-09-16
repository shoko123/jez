<template>
  <LayoutItemWithImage :options="options" header="Pottery Details">
    <template v-slot:e1>
      <PotteryForm :showTags="options.showTags"></PotteryForm>
    </template>
  </LayoutItemWithImage>
</template>

<script>
import PotteryForm from "./PotteryForm";
import LayoutItemWithImage from "../layouts/LayoutItemWithImage";

export default {
  components: {
    PotteryForm,
    LayoutItemWithImage,
  },
  props: {
    options: Object,
  },
};
</script>