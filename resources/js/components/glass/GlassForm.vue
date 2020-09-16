<template>
  <v-container v-if="ready" fluid class="pa-1 ma-0">
    <v-row wrap no-gutters>
      <v-textarea v-model="item.description" label="description" rows="1" auto-grow readonly filled></v-textarea>
    </v-row>
    <v-row wrap no-gutters>
      <v-text-field label="Rim Diameter" v-model="item.rim_diameter" class="mr-1" filled></v-text-field>
      <v-text-field label="Base Diameter" v-model="item.base_diameter" class="mr-1" filled></v-text-field>
      <v-text-field label="Bangle Diameter" v-model="item.bangle_diameter" class="mr-1" filled></v-text-field>
      <v-text-field label="Bead Diameter" v-model="item.bead_diameter" class="mr-1" filled></v-text-field>
      <v-text-field label="Pontil Diameter" v-model="item.pontil_diameter" class="mr-1" filled></v-text-field>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    showTags: Boolean,
  },
  computed: {
    ready() {
      return !this.$store.getters["mgr/xhrStatus"].loadingItem;
    },
    item() {
      return this.$store.getters["mgr/item"];
    },
  },
};
</script>



