<template>
  <LayoutItemWithImageCard :options="options" header="Metal Details">
    <template v-slot:e1>
      <MetalForm :showTags="options.showTags"></MetalForm>
    </template>
  </LayoutItemWithImageCard>
</template>

<script>
import MetalForm from "./MetalForm";
import LayoutItemWithImageCard from "../layouts/LayoutItemWithImageCard";

export default {
  components: {
    MetalForm,
    LayoutItemWithImageCard,
  },
  props: {
    options: Object,
  },
};
</script>