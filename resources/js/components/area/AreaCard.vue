<template>
  <LayoutItemWithImageCard :options="options" header="Area Details">
    <template v-slot:e1>
      <AreaForm :showTags="false"></AreaForm>
    </template>
  </LayoutItemWithImageCard>
</template>

<script>
import AreaForm from "./AreaForm";
import LayoutItemWithImageCard from "../layouts/LayoutItemWithImageCard";

export default {
  components: {
    AreaForm,
    LayoutItemWithImageCard,
  },
  props: {
    options: Object,
  },
};
</script>