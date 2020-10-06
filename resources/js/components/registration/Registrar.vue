<template>
  <v-container fluid>
    <v-row>
      <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
    </v-row>
    <v-row>
      <v-col :cols="3" class="px-1">
        <FieldPicker
          v-bind="{
            label: 'Season/Area',
            title: 'Pick Season/Area',
            collectionName: 'areasSeasons',
            fieldName: 'areaSeason',
          }"
        ></FieldPicker>
      </v-col>

      <v-col :cols="3" class="px-1">
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

    <v-row v-if="showFindDetails">
      <v-col :cols="2" class="px-1">
        <FieldPicker
          v-bind="{
            label: 'Registration',
            title: 'Pick Registration',
            collectionName: 'registrationCategories',
            fieldName: 'registration_category',
          }"
        ></FieldPicker
      ></v-col>
      <v-col :cols="2" class="px-1">
        <FieldPicker
          v-bind="{
            label: 'Basket',
            title: 'Pick Basket Number',
            collectionName: 'basketNos',
            fieldName: 'basket_no',
          }"
        ></FieldPicker
      ></v-col>
      <v-col :cols="2" class="px-1">
        <FieldPicker
          v-bind="{
            label: 'Artifact',
            title: 'Pick Artifact Number',
            collectionName: 'artifactNos',
            fieldName: 'artifact_no',
          }"
        ></FieldPicker
      ></v-col>
      <v-col :cols="1" class="px-1">
        <v-checkbox
          v-model="usePiece"
          label="use piece"
          color="orange"
        ></v-checkbox>
      </v-col>
      <v-col v-if="usePiece" :cols="2" class="px-1">
        <FieldPicker
          v-bind="{
            label: 'Piece',
            title: 'Pick Piece Number',
            collectionName: 'pieceNos',
            fieldName: 'piece_no',
          }"
        ></FieldPicker
      ></v-col>
    </v-row>
  </v-container>
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

    showFindDetails() {
      return this.$store.getters["regs/showRegistrarFindDetails"];
    },

    usePiece: {
      get() {
        return this.$store.getters["regs/usePiece"];
      },
      set(data) {
        console.log("registrar usePiece.dispatch" + data);
        this.$store.dispatch("regs/usePiece", data);
      },
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
