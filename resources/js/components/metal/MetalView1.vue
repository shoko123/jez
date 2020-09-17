<template>
  <Finds4PanelLayout>
    <template v-slot:e1>
      <MetalCard :options="{showTags: false, showImage: false}"></MetalCard>
    </template>
  </Finds4PanelLayout>
</template>

<script>
import Finds4PanelLayout from "../finds/Finds4PanelLayout";
import MetalCard from "./MetalCard";

export default {
  components: {
    Finds4PanelLayout,
    MetalCard,
  },
};
</script>