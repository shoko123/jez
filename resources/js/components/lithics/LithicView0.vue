<template>
  <Finds2PanelLayout>
    <template v-slot:e1>
      <LithicCard :options="{showTags: true, showImage: true}"></LithicCard>
    </template>
  </Finds2PanelLayout>
</template>

<script>
import Finds2PanelLayout from "../finds/Finds2PanelLayout";
import LithicCard from "./LithicCard";

export default {
  components: {
    Finds2PanelLayout,
    LithicCard,
  },
};
</script>