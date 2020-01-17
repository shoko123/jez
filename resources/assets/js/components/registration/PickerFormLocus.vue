<template>
  <v-row>
    <v-col xs12 sm6 class="px-2">
      <ElementAreaSeason />
    </v-col>
    <template v-if="area">
      <v-col xs12 sm6 class="px-2">
        <ElementLocus />
      </v-col>
    </template>
  </v-row>
</template>

<script>
import ElementAreaSeason from "../registration/ElementAreaSeason";
import ElementLocus from "../registration/ElementLocus";

export default {
  components: { ElementAreaSeason, ElementLocus },
  created() {
    console.log("PickerFormLocus.created");
  },
  destroyed() {
    console.log("PickerFormLocus.destroyed");
  },

  data() {
    return {
    };
  },

  computed: {
    area(){
        return this.$store.getters["reg/area"];     
    },
  },

  methods: {
  }
};
</script>
