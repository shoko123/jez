<template>
  <Finds4PanelLayout>
    <template v-slot:e1>
      <GlassCard :options="{showTags: false, showImage: false}"></GlassCard>
    </template>
  </Finds4PanelLayout>
</template>

<script>
import Finds4PanelLayout from "../finds/Finds4PanelLayout";
import GlassCard from "./GlassCard";

export default {
  components: {
    Finds4PanelLayout,
    GlassCard,
  },
};
</script>