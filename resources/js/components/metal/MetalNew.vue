<template>
  <form>
    <v-container fluid>
      <v-row class="mb-1">
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>
      <v-row wrap no-gutters>
        <v-textarea
          label="Description"
          v-model="description"
          :error-messages="descriptionErrors"
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()"
          filled
        ></v-textarea>
      </v-row>
      <v-row wrap no-gutters>
        <v-textarea
          label="Measurements"
          v-model="measurements"
          :error-messages="measurementsErrors"
          @input="$v.measurements.$touch()"
          @blur="$v.measurements.$touch()"
          filled
        ></v-textarea>
      </v-row>
    </v-container>
  </form>
</template>


<script>
import StepButtons from "../stepper/StepButtons";
import { maxLength } from "vuelidate/lib/validators";

export default {
  components: { StepButtons },

  validations: {
    description: {
      maxLength: maxLength(400),
    },
    measurements: {
      maxLength: maxLength(200),
    },
  },
  data: () => ({}),

  computed: {
    newItem() {
      return this.$store.getters["mtl/newItem"];
    },

    description: {
      get() {
        return this.newItem.description;
      },
      set(data) {
        this.$store.commit("mtl/description", data);
        this.handleNextButton();
      },
    },

    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) {
        return errors;
      }
      !this.$v.description.maxLength &&
        errors.push("Description exceeds length of 400 characters");
      return errors;
    },

    measurements: {
      get() {
        return this.newItem.measurements;
      },
      set(data) {
        this.$store.commit("mtl/measurements", data);
        this.handleNextButton();
      },
    },

    measurementsErrors() {
      const errors = [];
      if (!this.$v.measurements.$dirty) {
        return errors;
      }
      !this.$v.measurements.maxLength &&
        errors.push("Measurements exceeds max length of 200 characters");
      return errors;
    },
  },
  methods: {
    nextClicked() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("itemNew.Validation error");
        this.$store.commit("stp/disableNextButton", true);
      } else {
        this.$store.dispatch("mgr/store", true).then((res) => {
          this.$store.commit("stp/moveToStep", "first");
        });
      }
    },

    handleNextButton() {
      this.$v.$touch();
      this.$store.commit("stp/disableNextButton", !!this.$v.$invalid);
    },
  },
};
</script>


