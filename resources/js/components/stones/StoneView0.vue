<template>
  <Finds2panelLayout>
    <template v-slot:e1>
      <StoneCard :options="{showTags: true, showImage: true}"></StoneCard>
    </template>
  </Finds2panelLayout>
</template>

<script>
import Finds2panelLayout from "../finds/Finds2panelLayout";
import StoneCard from "./StoneCard";

export default {
  components: {
    Finds2panelLayout,
    StoneCard,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>
