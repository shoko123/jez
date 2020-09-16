<template>
  <Finds4PanelLayout>
    <template v-slot:e1>
      <LithicCard :options="{showTags: false, showImage: false}"></LithicCard>
    </template>
  </Finds4PanelLayout>
</template>

<script>
import Finds4PanelLayout from "../finds/Finds4PanelLayout";
import LithicCard from "./LithicCard";

export default {
  components: {
    Finds4PanelLayout,
    LithicCard,
  },
};
</script>