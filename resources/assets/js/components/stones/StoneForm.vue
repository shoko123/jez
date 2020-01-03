<template>
  <v-container fluid class="ma-0 mt-2 pa-0">
    <v-card class="elevation-12">
      <template v-if="stone">
        <v-card-title class="grey py-0 mb-4">Stone details</v-card-title>
        <v-card-text>
          <v-layout row wrap no-gutters>
            <v-flex xs12 sm2 class="px-1">
              <v-text-field v-model="stone_type" readonly label="stone type" filled></v-text-field>
            </v-flex>
            <v-flex xs12 sm2 class="px-1">
              <v-text-field v-model="material" readonly label="material" filled></v-text-field>
            </v-flex>
            <v-flex xs12 sm2 class="px-1">
              <v-text-field v-model="stone.weight" readonly label="weight" filled></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap no-gutters>
            <v-flex xs12 lg4 class="px-1">
              <v-textarea v-model="stone.notes" readonly label="notes" filled></v-textarea>
            </v-flex>
            <v-flex xs12 lg4 class="px-1">
              <v-textarea v-model="stone.measurements" readonly label="measurements" filled></v-textarea>
            </v-flex>
          </v-layout>
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
    stone() {
      return this.$store.getters["mgr/item"];
    },

    stone_type() {
      return this.stone.stone_type ? this.stone.stone_type.name : "";
    },
    material() {
      return this.stone.material ? this.stone.material.name : "";
    }
  },
  methods: {}
};
</script>



