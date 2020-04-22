<template>
  <div>
    <v-row>
      <v-col xs12 sm6 class="px-2">
        <ElementAreaSeason />
      </v-col>
      <template v-if="showLocus">
        <v-col xs12 sm6 class="px-2">
          <ElementLocus />
        </v-col>
      </template>
    </v-row>

    <template v-if="showFind">
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
    //console.log("FindForm.created");
  },

  computed: {
    regs() {
      return this.$store.getters["regs/regs"];
    },
    isFind() {
      return this.$store.getters["mgr/status"].isFind;
    },
    showLocus() {
      return this.regs ? this.regs.areaSeasonSelected : false;
    },

    showFind() {
      return this.regs ? (this.regs.locusSelected && this.isFind) : false;
    }
  },

  methods: {}
};
</script>
