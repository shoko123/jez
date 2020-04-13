<template>
  <div>
    <v-row>
      <v-col xs12 sm6 class="px-2">
        <ElementAreaSeason />
      </v-col>
      <template v-if="areaSeasonSelected">
        <v-col xs12 sm6 class="px-2">
          <ElementLocus />
        </v-col>
      </template>
    </v-row>

    <template v-if="locusSelected">
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
    //console.log("FindPickerForm.destroyed");
  },

  data() {
    return {};
  },

  computed: {
    regs() {
      return this.$store.getters["regs/regs"];
    },
    areaSeasonSelected() {
      return this.regs ? this.regs.areaSeasonSelected : false;
    },
    locusSelected() {
      return this.regs ? this.regs.locusSelected : false;
    }
  },

  methods: {}
};
</script>
