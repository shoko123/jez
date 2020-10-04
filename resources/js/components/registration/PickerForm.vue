<template>
  <div>
    <v-row>
      <v-col xs12 sm6 class="px-2">
        <FieldPicker v-bind="{ 
           label: 'Season/Area',
          title: 'Pick Season/Area',
          collectionName: 'areasSeasons',
          fieldName: 'areaSeason',
          }"></FieldPicker>
      </v-col>
      <v-col xs12 sm6 class="px-2">
        <FieldPicker v-bind="{ 
           label: 'Locus',
          title: 'Pick Locus Number',
          collectionName: 'loci',
          fieldName: 'locus',
          }"></FieldPicker>
      </v-col>
    </v-row>

    <v-row>
      <FieldPicker v-bind="{ 
           label: 'Find',
          title: 'Pick find',
          collectionName: 'finds',
          fieldName: 'find',
          }"></FieldPicker>
    </v-row>
  </div>
</template>

<script>

import FieldPicker from "./FieldPicker";

export default {
  components: { FieldPicker },
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
      return this.regs ? this.regs.locusSelected && this.isFind : false;
    },
  },

  methods: {},
};
</script>
