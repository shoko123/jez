<template>
  <LayoutItemWithImageCard :options="options" header="Season Details">
    <template v-slot:e1>
      <SeasonForm :showTags="false"></SeasonForm>
    </template>
  </LayoutItemWithImageCard>
</template>

<script>
import SeasonForm from "./SeasonForm";
import LayoutItemWithImageCard from "../layouts/LayoutItemWithImageCard";

export default {
  components: {
    SeasonForm,
    LayoutItemWithImageCard,
  },
  props: {
    options: Object,
  },
};
</script>