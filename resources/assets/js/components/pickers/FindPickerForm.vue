<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="px-2">
        <areaSeasonPicker />
      </v-flex>
      <template v-if="areaSeason">
        <v-flex xs12 sm6 class="px-2">
          <locusPicker />
        </v-flex>
      </template>
    </v-layout>

    <template v-if="locus">
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
    areaSeason() {
      return this.$store.getters["pkr/areaSeason"];
    },
    locus() {
      return this.$store.getters["pkr/locus"];
    }
  },

  methods: {}
};
</script>
