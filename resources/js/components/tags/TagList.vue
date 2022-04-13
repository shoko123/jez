<template>
  <v-row  v-if="showTags" wrap no-gutters>
    <div
    
      v-for="tag in tags"
      :key="tag.id"
      class="font-weight-normal ml-1 text-subtitle-1"
    >
      {{ tag.display_name }}:
      <v-chip
        v-for="param in tag.params"
        :key="param.id"
        class="font-weight-normal pa-1 mb-1 body-1"
        >{{ param.name }}</v-chip
      >
    </div>
  </v-row>
</template>

<script>
export default {
  computed: {
    tags() {
      return this.$store.getters[`aux/selectedItemParams`];
    },
    showTags() {
      return this.$store.getters["mgr/status"].itemDisplayOptionIndex === 0;
    },
  },
};
</script>