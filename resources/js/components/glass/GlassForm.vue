<template>

    <v-card class="elevation-12">
      <template v-if="item">
        <v-card-title class="grey py-0 mb-4">Glass details</v-card-title>
        <v-card-text>
          <v-row wrap no-gutters>
            <v-textarea
              v-model="item.description"
              label="description"
              rows="1"
              auto-grow
              readonly
              filled
            ></v-textarea>
          </v-row>
          <v-row wrap no-gutters>
            <v-text-field label="Rim Diameter" v-model="item.rim_diameter" class="mr-1" filled></v-text-field>
            <v-text-field label="Base Diameter" v-model="item.base_diameter" class="mr-1" filled></v-text-field>
            <v-text-field
              label="Bangle Diameter"
              v-model="item.bangle_diameter"
              class="mr-1"
              filled
            ></v-text-field>
            <v-text-field label="Bead Diameter" v-model="item.bead_diameter" class="mr-1" filled></v-text-field>
            <v-text-field
              label="Pontil Diameter"
              v-model="item.pontil_diameter"
              class="mr-1"
              filled
            ></v-text-field>
          </v-row>
        </v-card-text>
      </template>
    </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    item() {
      return this.$store.getters["mgr/item"];
    },
  },
  methods: {},
};
</script>



