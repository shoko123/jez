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

    <template v-if="locus">
      <findPicker />
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
    console.log("FindPickerForm.created");
  },
  destroyed() {
    console.log("FindPickerForm.destroyed");
  },

  data() {
    return {};
  },

  computed: {
    area() {
      return this.$store.getters["pkr/area"];
    },
    locus() {
      return this.$store.getters["pkr/locus"];
    }
  },

  methods: {}
};
</script>
