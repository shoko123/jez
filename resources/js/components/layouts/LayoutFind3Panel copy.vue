<template>
  <Layout2Columns>
    <template v-slot:e1>
      <ItemCard />
      <v-divider inset vertical></v-divider>
      <FindForm></FindForm>
    </template>
    <template v-slot:e2>
      <TagsForm source="itemParams"></TagsForm>
    </template>
  </Layout2Columns>
</template>

<script>
import Layout2Columns from "./Layout2Columns";
import ItemCard from "./ItemCard";
import FindForm from "../finds/FindForm";
import TagsForm from "../tags/TagsForm";
export default {
  components: {
    Layout2Columns,
    ItemCard,
    FindForm,
    TagsForm,
  },
  computed: {
    mediaCnt() {
      return [this.$store.getters["mgr/collections"]("media")].length;
    },
    mediaHeader() {
      return `Media (${this.mediaCnt})`;
    },
  },
};
</script>
