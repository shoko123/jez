<template>
  <v-container fluid>
    <template v-if="groundstone">
      <v-card class="elevation-12">
        <v-card-text>
          <v-card-title>
            <h2>Groundstone details:</h2>
          </v-card-title>
          <v-layout row wrap>
            <v-flex xs12 sm2 class="px-1">
              <v-text-field v-model="groundstone_type" readonly label="gs type" filled></v-text-field>
            </v-flex>
            <v-flex xs12 sm2 class="px-1">
              <v-text-field v-model="material" readonly label="material" filled></v-text-field>
            </v-flex>
            <v-flex xs12 sm2 class="px-1">
              <v-text-field v-model="groundstone.weight" readonly label="weight" filled></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 lg4 class="px-1">
              <v-textarea v-model="groundstone.notes" readonly label="notes" filled></v-textarea>
            </v-flex>
            <v-flex xs12 lg4 class="px-1">
              <v-textarea v-model="groundstone.measurements" readonly label="measurements" filled></v-textarea>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    groundstone() {
      return this.$store.getters["gss/item"];
    },
    groundstone_type() {
      return this.groundstone.groundstone_type
        ? this.groundstone.groundstone_type.name
        : "";
    },
    material() {
      return this.groundstone.material ? this.groundstone.material.name : "";
    },

  },
  methods: {

  }
};
</script>



