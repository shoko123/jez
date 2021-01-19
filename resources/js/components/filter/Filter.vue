<template>
  <div>
    <SubMenuFilter />
    <v-container fluid class="ma-0">
      <v-row wrap dense>
        <v-col md="12" lg="9" class="d-flex flex-column">
          <FilterSelect></FilterSelect>
        </v-col>
        <v-col md="12" lg="3" class="d-flex flex-column">
          <TagsForm source="filters"></TagsForm>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SubMenuFilter from "./SubMenuFilter";
import FilterSelect from "./FilterSelect";
import TagsForm from "../tags/TagsForm";

export default {
  components: { SubMenuFilter, FilterSelect, TagsForm },
};
</script>
