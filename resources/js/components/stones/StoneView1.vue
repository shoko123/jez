<template>
  <Finds4PanelLayout>
    <template v-slot:e1>
      <StoneCard :options="{showTags: false, showImage: false}"></StoneCard>
    </template>
  </Finds4PanelLayout>
</template>

<script>
import Finds4PanelLayout from "../finds/Finds4PanelLayout";
import StoneCard from "./StoneCard";

export default {
  components: {
    Finds4PanelLayout,
    StoneCard,
  },
};
</script>
