<template>
  <v-container fluid class="ma-0">
    <v-row wrap dense>
      <v-col md="12" lg="9" class="d-flex flex-column">
        <TagSelector></TagSelector>
         <v-divider inset vertical></v-divider>
         <ItemCard />
      </v-col>
      <v-col md="12" lg="3" class="d-flex flex-column">
        <TagsForm source="newParams"></TagsForm>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TagsForm from "./TagsForm";
import TagSelector from "./TagsSelector";
import ItemCard from "../layouts/ItemCard";


export default {
  components: { TagSelector, TagsForm, ItemCard },
};
</script>
