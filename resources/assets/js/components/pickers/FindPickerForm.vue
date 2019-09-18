<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="px-2">
        <areaSeasonPicker />
      </v-flex>
      <template v-if="area_season_id">
        <v-flex xs12 sm6 class="px-2">
          <locusPicker />
        </v-flex>
      </template>
    </v-layout>

    <template v-if="locus_id">
      <v-layout row wrap>
        <v-flex xs12 sm12 class="px-2">
          <findPicker />
        </v-flex>
      </v-layout>
    </template>
  </div>
</template>

<script>
import areaSeasonPicker from "../pickers/areaSeasonPicker";
import locusPicker from "../pickers/locusPicker";
import findPicker from "../pickers/findPicker";
export default {
  components: { areaSeasonPicker, locusPicker, findPicker },
  created() {
    console.log("LocusPickerForm.created");
  },
  destroyed() {
    console.log("LocusPickerForm.destroyed");
  },

  data() {
    return {};
  },

  computed: {
    area_season_id() {
      return this.$store.getters["pkr/area_season_id"];
    },
    locus_id() {
      return this.$store.getters["pkr/locus_id"];
    }
  },

  methods: {}
};
</script>
