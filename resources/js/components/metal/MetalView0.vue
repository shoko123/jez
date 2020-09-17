<template>
  <Finds2PanelLayout>
    <template v-slot:e1>
      <MetalCard :options="{showTags: true, showImage: true}"></MetalCard>
    </template>
  </Finds2PanelLayout>
</template>

<script>
import Finds2PanelLayout from "../finds/Finds2PanelLayout";
import MetalCard from "./MetalCard";

export default {
  components: {
    Finds2PanelLayout,
    MetalCard,
  },
};
</script>