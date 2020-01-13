<template>
<div>
  <v-layout row wrap>
    <v-flex xs12 sm6 class="px-2">
      <areaSeasonPicker />
    </v-flex>
    <template v-if="area">
      <v-flex xs12 sm6 class="px-2">
        <locusPicker />
      </v-flex>
    </template>
  </v-layout>
  </div>
</template>

<script>
import areaSeasonPicker from "../pickers/areaSeasonPicker";
import locusPicker from "../pickers/locusPicker";

export default {
  components: { areaSeasonPicker, locusPicker },
  created() {
    console.log("LocusPickerForm.created");
  },
  destroyed() {
    console.log("LocusPickerForm.destroyed");
  },

  data() {
    return {
    };
  },

  computed: {
    area(){
        return this.$store.getters["pkr/area"];     
    },
  },

  methods: {
  }
};
</script>
