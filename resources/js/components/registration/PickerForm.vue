<template>
  <v-container>
    <v-row>
      <v-col :cols="6" class="px-1">
        <FieldPicker
          v-bind="{
            label: 'Season/Area',
            title: 'Pick Season/Area',
            collectionName: 'areasSeasons',
            fieldName: 'areaSeason',
          }"
        ></FieldPicker>
      </v-col>
      <v-col v-if="showLoci" :cols="6" class="px-1">
        <FieldPicker
          v-bind="{
            label: 'Locus',
            title: 'Pick Locus Number',
            collectionName: 'loci',
            fieldName: 'locus',
          }"
        ></FieldPicker>
      </v-col>
    </v-row>

    <v-row v-if="showFinds">
      <FieldPicker
        v-bind="{
          label: 'Find',
          title: 'Pick find',
          collectionName: 'finds',
          fieldName: 'find',
        }"
      ></FieldPicker>
    </v-row>
  </v-container>
</template>

<script>
import FieldPicker from "./FieldPicker";

export default {
  components: { FieldPicker },
  created() {
    //console.log("FindForm.created");
  },

  computed: {
    showLoci() {
      return !this.$store.getters["mgr/status"].isAreaSeason;
    },
    showFinds() {
      return this.$store.getters["mgr/status"].isFind;
    },
  },
  methods: {},
};
</script>
