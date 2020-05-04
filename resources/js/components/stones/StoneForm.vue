<template>
  <v-container fluid class="ma-0 pa-0">
    <v-card class="elevation-12">
      <template v-if="stone">
        <v-card-title class="grey py-0 mb-4">Stone details</v-card-title>

        <v-card-text>
          <v-row wrap no-gutters>
            <v-col xs12 lg8 class="px-1">
              <v-row wrap no-gutters>
                <v-textarea v-model="stone.notes" label="notes" rows="1" auto-grow readonly filled></v-textarea>
              </v-row>
              <v-row wrap no-gutters>
                <v-textarea
                  v-model="stone.measurements"
                  rows="2"
                  auto-grow
                  readonly
                  label="measurements"
                  filled
                ></v-textarea>
              </v-row>
            </v-col>

            <v-col :cols="2" class="px-1">
              <v-text-field label="length" v-model="stone.length" name="length" filled></v-text-field>
              <v-text-field label="width" v-model="stone.width" name="width" filled></v-text-field>
              <v-text-field
                label="thickness (min)"
                v-model="stone.thickness_min"
                name="thickness_min"
                filled
              ></v-text-field>
              <v-text-field
                label="thickness max"
                v-model="stone.thickness_max"
                name="thickness_max"
                filled
              ></v-text-field>
              <v-text-field label="depth" v-model="stone.depth" name="depth" filled></v-text-field>
              <v-text-field label="diameter" v-model="stone.diameter" name="diameter" filled></v-text-field>
              <v-text-field label="weight" v-model="stone.weight" name="weight" filled></v-text-field>
            </v-col>

            <v-col :cols="2" class="px-1">
              <v-text-field
                label="perf diam (min)"
                v-model="stone.perforation_diameter_min"
                name="perforation_diameter_min"
                filled
              ></v-text-field>
              <v-text-field
                label="perf diam (max)"
                v-model="stone.perforation_diameter_max"
                name="perforation_diameter_max"
                filled
              ></v-text-field>
              <v-text-field
                label="perf depth"
                v-model="stone.perforation_depth"
                name="perforation_depth"
                filled
              ></v-text-field>
              <v-text-field
                label="rim diam"
                v-model="stone.rim_diameter"
                name="rim_diameter"
                filled
              ></v-text-field>
              <v-text-field
                label="rim thickness"
                v-model="stone.rim_thickness"
                name="rim_thickness"
                filled
              ></v-text-field>
              <v-text-field
                label="base diam"
                v-model="stone.base_diameter"
                name="base_diameter"
                filled
              ></v-text-field>
              <v-text-field
                label="base thickness"
                v-model="stone.base_thickness"
                name="base_thickness"
                filled
              ></v-text-field>
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
    }
  },
  methods: {}
};
</script>



