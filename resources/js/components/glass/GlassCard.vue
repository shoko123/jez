<template>
  <LayoutItemWithImage :options="options" header="Glass Details">
    <template v-slot:e1>
      <GlassForm :showTags="options.showTags"></GlassForm>
    </template>
  </LayoutItemWithImage>
</template>

<script>
import GlassForm from "./GlassForm";
import LayoutItemWithImage from "../layouts/LayoutItemWithImage";

export default {
  components: {
    GlassForm,
    LayoutItemWithImage,
  },
  props: {
    options: Object,
  },
};
</script>