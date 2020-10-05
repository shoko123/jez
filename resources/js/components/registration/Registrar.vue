<template>
  <div>
    <v-row wrap>
      <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
    </v-row>
    <v-row wrap>
      <v-col xs12 sm6 class="px-2">
        <!--ElementAreaSeason /-->
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

    <template v-if="showFind">
      <v-row wrap>
        <v-col xs12 sm12 class="px-2">
          <ElementFind />
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import FieldPicker from "./FieldPicker";
import ElementLocus from "./ElementLocus";
import ElementFind from "./ElementFind";
import StepButtons from "../stepper/StepButtons";

export default {
  components: { FieldPicker, ElementLocus, ElementFind, StepButtons },
  created() {
    console.log("Registrar.created - loading areasSeasons");
    this.$store.dispatch("regs/loadAreasSeasons", null);
  },

  destroyed() {
    console.log("Registrar.destroyed");
  },

  data() {
    return {};
  },

  computed: {
  status() {
      return this.$store.getters["regs/status"];
    },
  
    showLocus() {
      return false;
    },

    showFind() {
      return false;
    },
  },

  methods: {
    nextClicked() {
      console.log(
        "Registrar.nextClicked: " +
          JSON.stringify(this.$store.getters["regs/newItem"], null, 2)
      );
      

      if (!this.status.ready) {
        console.log("Registrar - validation error");
        this.$store.commit("stp/disableNextButton", true);
      } else {
        console.log("Registrar - validation passed - before next");
        this.$store.dispatch("regs/copyRegistration");
        this.$store.commit("stp/moveToStep", "next");
      }
    },
  },
};
</script>
