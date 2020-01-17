<template>
  <div>
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

    <template v-if="locus">
      <ElementFind />
    </template>
  </div>
</template>

<script>
import ElementAreaSeason from "../registration/ElementAreaSeason";
import ElementLocus from "../registration/ElementLocus";
import ElementFind from "../registration/ElementFind";

export default {
  components: { ElementAreaSeason, ElementLocus, ElementFind },
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
      return this.$store.getters["reg/area"];
    },
    locus() {
      return this.$store.getters["reg/locus"];
    }
  },

  methods: {}
};
</script>
