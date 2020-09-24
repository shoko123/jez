<template>
  <form>
    <v-container fluid>
      <v-row class="mb-2">
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>

      <v-row wrap no-gutters>
        <v-text-field
          label="Periods"
          v-model="periods"
          :error-messages="periodsErrors"
          @input="$v.periods.$touch()"
          @blur="$v.periods.$touch()"
          filled
        ></v-text-field>
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
    </v-container>
  </form>
</template>


<script>
import StepButtons from "../stepper/StepButtons";
import { maxLength } from "vuelidate/lib/validators";

export default {
  components: { StepButtons },

  validations: {
    periods: {
      maxLength: maxLength(100),
    },
    description: {
      maxLength: maxLength(400),
    },
  },

  computed: {
    newItem() {
      return this.$store.getters["pot/newItem"];
    },

    periods: {
      get() {
        return this.newItem.periods;
      },
      set(data) {
        this.$store.commit("pot/periods", data);
        this.handleNextButton();
      },
    },
    periodsErrors() {
      const errors = [];
      if (!this.$v.periods.$dirty) {
        return errors;
      }
      !this.$v.periods.maxLength &&
        errors.push("Periods text exceeds length of 100 characters");
      return errors;
    },

    description: {
      get() {
        return this.newItem.description;
      },
      set(data) {
        this.$store.commit("pot/description", data);
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


