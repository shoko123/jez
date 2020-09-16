<template>
  <Finds2panelLayout>
    <template v-slot:e1>
      <StoneCard :showTags="true"></StoneCard>
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
  computed: {},
};
</script>
