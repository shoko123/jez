<template>
  <LayoutItemWithImageCard :options="options" header="Lithic Details">
    <template v-slot:e1>
      <LithicForm :showTags="options.showTags"></LithicForm>
    </template>
  </LayoutItemWithImageCard>
</template>

<script>
import LithicForm from "./LithicForm";
import LayoutItemWithImageCard from "../layouts/LayoutItemWithImageCard";

export default {
  components: {
    LithicForm,
    LayoutItemWithImageCard,
  },
  props: {
    options: Object,
  },
};
</script>