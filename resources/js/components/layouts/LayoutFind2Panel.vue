<template>
    <v-container fluid class="mt-1 pa-1 ma-0">
      <ItemCard/>
      <v-divider inset vertical></v-divider>
      <FindForm></FindForm>
    </v-container>
</template>

<script>
import ItemCard from "./ItemCard";
import FindForm from "../finds/findForm";

export default {
  components: {
    ItemCard,
    FindForm,
  },
};
</script>