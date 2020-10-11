<template>
  <LayoutItemWithImage :options="options" header="Area/Season Details">
    <template v-slot:e1>
      <AreaSeasonForm :showTags="false"></AreaSeasonForm>
    </template>
  </LayoutItemWithImage>
</template>

<script>
import AreaSeasonForm from "./AreaSeasonForm";
import LayoutItemWithImage from "../layouts/LayoutItemWithImage";

export default {
  components: {
    AreaSeasonForm,
    LayoutItemWithImage,
  },
  props: {
    options: Object,
  },
};
</script>