<template>
  <LayoutItemWithImage :options="options" header="Lithic Details">
    <template v-slot:e1>
      <LithicForm :showTags="options.showTags"></LithicForm>
    </template>
  </LayoutItemWithImage>
</template>

<script>
import LithicForm from "./LithicForm";
import LayoutItemWithImage from "../layouts/LayoutItemWithImage";

export default {
  components: {
    LithicForm,
    LayoutItemWithImage,
  },
  props: {
    options: Object,
  },
};
</script>