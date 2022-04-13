<template>
  <v-container v-if="item" fluid class="pa-1 ma-0">  
      <v-row wrap no-gutters>
        <v-textarea
          v-model="item.description"
          label="Description"
          rows="1"
          auto-grow
          readonly
          filled
        ></v-textarea>
      </v-row>
      
      <v-row wrap no-gutters>
        <v-textarea
          v-model="item.notes"
          v-show="item.notes"
          label="Notes"
          rows="1"
          auto-grow
          readonly
          filled
        ></v-textarea>
      </v-row>

      <v-row wrap no-gutters>
        <v-text-field
          label="Length"
          v-model="item.length"
          v-show="item.length"
          class="mr-1"
          name="length"
          filled
        ></v-text-field>

        <v-text-field
          label="Width"
          v-model="item.width"
          v-show="item.width"
          class="mr-1"
          name="width"
          filled
        ></v-text-field>

        <v-text-field
          label="Thickness (min)"
          v-model="item.thickness_min"
          v-show="item.thickness_min"
          name="thickness_min"
          class="mr-1"
          filled
        ></v-text-field>

        <v-text-field
          label="Thickness (max)"
          v-model="item.thickness_max"
          v-show="item.thickness_max"
          name="thickness_max"
          class="mr-1"
          filled
        ></v-text-field>

        <v-text-field
          label="Depth"
          v-model="item.depth"
          v-show="item.depth"
          name="depth"
          class="mr-1"
          filled
        ></v-text-field>

        <v-text-field
          label="Diameter"
          v-model="item.diameter"
          v-show="item.diameter"
          name="diameter"
          class="mr-1"
          filled
        ></v-text-field>

        <v-text-field
          label="Weight"
          v-model="item.weight"
          v-show="item.weight"
          name="weight"
          class="mr-1"
          filled
        ></v-text-field>

        <v-text-field
          label="Perforation Diam (min)"
          v-model="item.perforation_diameter_min"
          v-show="item.perforation_diameter_min"
          name="perforation_diameter_min"
          class="mr-1"
          filled
        ></v-text-field>

        <v-text-field
          label="Perforation Diam (max)"
          v-model="item.perforation_diameter_max"
          v-show="item.perforation_diameter_max"
          name="perforation_diameter_max"
          class="mr-1"
          filled
        ></v-text-field>

        <v-text-field
          label="Perforation Depth"
          v-model="item.perforation_depth"
          v-show="item.perforation_depth"
          name="perforation_depth"
          class="mr-1"
          filled
        ></v-text-field>

        <v-text-field
          label="Rim Diam"
          v-model="item.rim_diameter"
          v-show="item.rim_diameter"
          name="rim_diameter"
          class="mr-1"
          filled
        ></v-text-field>

        <v-text-field
          label="Rim Thickness"
          v-model="item.rim_thickness"
          v-show="item.rim_thickness"
          name="rim_thickness"
          class="mr-1"
          filled
        ></v-text-field>

        <v-text-field
          label="Base Diam"
          v-model="item.base_diameter"
          v-show="item.base_diameter"
          name="base_diameter"
          class="mr-1"
          filled
        ></v-text-field>

        <v-text-field
          label="Base Thickness"
          v-model="item.base_thickness"
          v-show="item.base_thickness"
          name="base_thickness"
          class="mr-1"
          filled
        ></v-text-field>
      </v-row>
      <TagList />
      <!--v-row wrap no-gutters>
            <v-text-field
              label="Preservation"
              v-model="item.preservation_name"
              v-show="item.preservation_name"
              class="mr-1"
              filled
            ></v-text-field>

            <v-text-field
              label="Material"
              v-model="item.material_name"
              v-show="item.material_name"
              name="thickness_min"
              class="mr-1"
              filled
            ></v-text-field>

      </v-row-->
   
  </v-container>
</template>

<script>
import TagList from "../tags/TagList";
export default {
   components: {
    TagList,
  },

  computed: {
    item() {
      return this.$store.getters["mgr/item"];
    },
    tags() {
      return this.$store.getters[`aux/selectedItemParams`];
    },
  },
};
</script>



