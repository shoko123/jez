<template>
  <v-container fluid class="ma-0 mt-2 pa-0">
    <v-card class="elevation-12">
      <template v-if="pottery">
        <v-card-title class="grey py-0 mb-4">Pottery details</v-card-title>
        <v-card-text>
          <v-row wrap no-gutters>
            <v-flex xs12 lg4 class="px-1">
              <v-textarea v-model="pottery.periods" readonly label="periods" filled></v-textarea>
            </v-flex>
            <v-flex xs12 lg4 class="px-1">
              <v-textarea v-model="pottery.notes" readonly label="notes" filled></v-textarea>
            </v-flex>
            <v-flex xs12 lg4 class="px-1">
              <v-textarea v-model="pottery.description" readonly label="description" filled></v-textarea>
            </v-flex>
          </v-row>
        </v-card-text>
      </template>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    pottery() {
      return this.$store.getters["mgr/item"];
    },
  },
  methods: {}
};
</script>



