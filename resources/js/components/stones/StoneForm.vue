<template>
  <!--v-container fluid class="ma-0 pa-0"-->
    <v-card class="elevation-12">
      <template v-if="stone">
        <v-card-title class="grey py-0 mb-4">Stone Details</v-card-title>

        <v-card-text>
          <v-row wrap no-gutters>
            <v-col xs12 lg9 class="px-1">
              <v-row wrap no-gutters>
                <v-textarea
                  v-model="stone.description"
                  label="Description"
                  rows="1"
                  auto-grow
                  readonly
                  filled
                ></v-textarea>
              </v-row>
              <v-row wrap no-gutters>
                <v-textarea v-model="stone.notes" label="Notes" rows="1" auto-grow readonly filled></v-textarea>
              </v-row>
            </v-col>

            <v-col xs12 lg3 class="px-1">
              <v-row wrap dense>
                <v-text-field
                  label="Length"
                  v-model="stone.length"
                  v-show="stone.length"
                  class="mr-1"
                  name="length"
                  filled
                ></v-text-field>

                <v-text-field
                  label="Width"
                  v-model="stone.width"
                  v-show="stone.width"
                  class="mr-1"
                  name="width"
                  filled
                ></v-text-field>

                <v-text-field
                  label="Thickness (min)"
                  v-model="stone.thickness_min"
                  v-show="stone.thickness_min"
                  name="thickness_min"
                  class="mr-1"
                  filled
                ></v-text-field>

                <v-text-field
                  label="Thickness (max)"
                  v-model="stone.thickness_max"
                  v-show="stone.thickness_max"
                  name="thickness_max"
                  class="mr-1"
                  filled
                ></v-text-field>

                <v-text-field
                  label="Depth"
                  v-model="stone.depth"
                  v-show="stone.depth"
                  name="depth"
                  class="mr-1"
                  filled
                ></v-text-field>

                <v-text-field
                  label="Diameter"
                  v-model="stone.diameter"
                  v-show="stone.diameter"
                  name="diameter"
                  class="mr-1"
                  filled
                ></v-text-field>

                <v-text-field
                  label="Weight"
                  v-model="stone.weight"
                  v-show="stone.weight"
                  name="weight"
                  class="mr-1"
                  filled
                ></v-text-field>

                <v-text-field
                  label="Perforation Diam (min)"
                  v-model="stone.perforation_diameter_min"
                  v-show="stone.perforation_diameter_min"
                  name="perforation_diameter_min"
                  class="mr-1"
                  filled
                ></v-text-field>

                <v-text-field
                  label="Perforation Diam (max)"
                  v-model="stone.perforation_diameter_max"
                  v-show="stone.perforation_diameter_max"
                  name="perforation_diameter_max"
                  class="mr-1"
                  filled
                ></v-text-field>

                <v-text-field
                  label="Perforation Depth"
                  v-model="stone.perforation_depth"
                  v-show="stone.perforation_depth"
                  name="perforation_depth"
                  class="mr-1"
                  filled
                ></v-text-field>

                <v-text-field
                  label="Rim Diam"
                  v-model="stone.rim_diameter"
                  v-show="stone.rim_diameter"
                  name="rim_diameter"
                  class="mr-1"
                  filled
                ></v-text-field>

                <v-text-field
                  label="Rim Thickness"
                  v-model="stone.rim_thickness"
                  v-show="stone.rim_thickness"
                  name="rim_thickness"
                  class="mr-1"
                  filled
                ></v-text-field>

                <v-text-field
                  label="Base Diam"
                  v-model="stone.base_diameter"
                  v-show="stone.base_diameter"
                  name="base_diameter"
                  class="mr-1"
                  filled
                ></v-text-field>

                <v-text-field
                  label="Base Thickness"
                  v-model="stone.base_thickness"
                  v-show="stone.base_thickness"
                  name="base_thickness"
                  class="mr-1"
                  filled
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </template>
    </v-card>
  <!--/v-container-->
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



