<template>
  <LayoutItemWithImage :options="options" header="Metal Details">
    <template v-slot:e1>
      <MetalForm :showTags="options.showTags"></MetalForm>
    </template>
  </LayoutItemWithImage>
</template>

<script>
import MetalForm from "./MetalForm";
import LayoutItemWithImage from "../layouts/LayoutItemWithImage";

export default {
  components: {
    MetalForm,
    LayoutItemWithImage,
  },
  props: {
    options: Object,
  },
};
</script>