<template>
  <Layout2Columns>
    <template v-slot:e1>
      <ItemCard />
      <v-divider inset vertical></v-divider>
      <FindForm></FindForm>
    </template>
    <template v-slot:e2>
      <!--MediaSquare
            v-bind="{ source: 'ItemMedia', index: 0, size: 400, header: mediaHeader}"
          ></MediaSquare>
          <v-divider inset vertical></v-divider-->
      <TagsForm source="itemParams"></TagsForm>
    </template>
  </Layout2Columns>
</template>

<script>
import Layout2Columns from "./Layout2Columns";
import ItemCard from "./ItemCard";
import FindForm from "../finds/findForm";
import TagsForm from "../tags/TagsForm";
import MediaSquare from "../media/MediaSquare";
export default {
  components: {
    Layout2Columns,
    ItemCard,
    FindForm,
    MediaSquare,
    TagsForm,
  },
  computed: {
    mediaCnt() {
      return this.$store.getters["med/itemAllMedia"].length;
    },
    mediaHeader() {
      return `Media (${this.mediaCnt})`;
    },
  },
};
</script>
