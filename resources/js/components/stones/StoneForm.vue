<template>
  <v-container fluid class="ma-0 pa-0">
    <v-card class="elevation-12">
      <template v-if="stone">
        <v-card-title class="grey py-0 mb-4">Stone details</v-card-title>
       
        <v-card-text>

          <v-row wrap no-gutters>
            <v-col xs12 lg4 class="px-1">
              <v-textarea v-model="stone.notes" label="notes" rows="1" auto-grow readonly filled></v-textarea>
            </v-col>
            <v-col xs12 lg4 class="px-1">
              <v-textarea
                v-model="stone.measurements"
                rows="1"
                auto-grow
                readonly
                label="measurements"
                filled
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row wrap no-gutters>
            <v-col xs12 sm2 class="px-1">
              <v-text-field v-model="stone.weight" readonly label="weight" filled></v-text-field>
            </v-col>
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
    stone() {
      return this.$store.getters["mgr/item"];
    },
  },
  methods: {}
};
</script>



