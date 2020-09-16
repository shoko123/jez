<template>
  <Finds2PanelLayout>
    <template v-slot:e1>
      <PotteryCard :options="{showTags: true, showImage: true}"></PotteryCard>
    </template>
  </Finds2PanelLayout>
</template>

<script>
import Finds2PanelLayout from "../finds/Finds2PanelLayout";
import PotteryCard from "./PotteryCard";

export default {
  components: {
    Finds2PanelLayout,
    PotteryCard,
  },
};
</script>
