<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn @click="toFilter()" class="primary--text" large outlined v-on="on">
        <v-icon left class="primary--text">mdi-filter</v-icon>{{count}}</v-btn>
    </template>
    <span>
       <TagsForm source="filters"></TagsForm>
    </span>
  </v-tooltip>
</template>

<script>
import TagsForm from "../tags/TagsForm";

export default {
  components: { TagsForm },

  computed: {
    count() {
      let count = this.$store.getters["aux/selectedFilters"].reduce(
        (accumulator, type) => accumulator + type.count,
        0
      );
      return `(${count})`;
    },
    disabled() {
      return !this.$store.getters["mgr/status"].isFilterable;
    }
  },

  methods: {
    toFilter() {
      this.$router.push({
        path: `${this.$store.getters["mgr/moduleInfo"].appBaseUrl}/filter`,
      });
    },
  },
};
</script>