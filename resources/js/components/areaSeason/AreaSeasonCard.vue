<template>
  <LayoutItemWithImageCard :options="options" header="Area/Season Details">
    <template v-slot:e1>
      <AreaSeasonForm :showTags="false"></AreaSeasonForm>
    </template>
  </LayoutItemWithImageCard>
</template>

<script>
import AreaSeasonForm from "./AreaSeasonForm";
import LayoutItemWithImageCard from "../layouts/LayoutItemWithImageCard";

export default {
  components: {
    AreaSeasonForm,
    LayoutItemWithImageCard,
  },
  props: {
    options: Object,
  },
};
</script>