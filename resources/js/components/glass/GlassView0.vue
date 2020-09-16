<template>
  <Finds2PanelLayout>
    <template v-slot:e1>
      <GlassCard :options="{showTags: true, showImage: true}"></GlassCard>
    </template>
  </Finds2PanelLayout>
</template>

<script>
import Finds2PanelLayout from "../finds/Finds2PanelLayout";
import GlassCard from "./GlassCard";

export default {
  components: {
    Finds2PanelLayout,
    GlassCard,
  },
};
</script>