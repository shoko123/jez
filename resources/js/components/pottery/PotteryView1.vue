<template>
  <Finds4PanelLayout>
    <template v-slot:e1>
      <PotteryCard :options="{showTags: false, showImage: false}"></PotteryCard>
    </template>
  </Finds4PanelLayout>
</template>

<script>
import Finds4PanelLayout from "../finds/Finds4PanelLayout";
import PotteryCard from "./PotteryCard";

export default {
  components: {
    Finds4PanelLayout,
    PotteryCard,
  },
};
</script>