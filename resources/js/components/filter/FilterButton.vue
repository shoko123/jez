<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn @click="toFilter()" class="primary--text" large outlined v-on="on">
        <v-icon left class="primary--text">mdi-filter</v-icon>{{filtersText}}</v-btn>
    </template>
    <span>
       <TagsForm source="Filters"></TagsForm>
    </span>
  </v-tooltip>
</template>

<script>
import TagsForm from "../tags/TagsForm";

export default {
  components: { TagsForm },

  computed: {
    filtersText() {
      return `(${this.$store.getters["aux/totalNoSelected"].filters})`;
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