<template>
  <LayoutItemCardOptionalImage header="Glass Details">
    <template v-slot:e1>
      <GlassForm :showTags="options.showTags"></GlassForm>
    </template>
  </LayoutItemCardOptionalImage>
</template>

<script>
import GlassForm from "./GlassForm";
import LayoutItemCardOptionalImage from "../layouts/LayoutItemCardOptionalImage";

export default {
  components: {
    GlassForm,
    LayoutItemCardOptionalImage,
  },
  props: {
    options: Object,
  },
};
</script>