<template>
  <Finds2PanelLayout>
    <template v-slot:e1>
      <StoneCard :options="{showTags: true, showImage: true}"></StoneCard>
    </template>
  </Finds2PanelLayout>
</template>

<script>
import Finds2PanelLayout from "../finds/Finds2PanelLayout";
import StoneCard from "./StoneCard";

export default {
  components: {
    Finds2PanelLayout,
    StoneCard,
  },
};
</script>
